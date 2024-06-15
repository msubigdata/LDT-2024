/* eslint-disable no-nested-ternary -- ternary is fine here */

import { zodResolver } from "@hookform/resolvers/zod";
import { util, ZodIssueCode, ZodParsedType } from "zod";

import type { Resolver } from "@hookform/resolvers/zod";
import type { FieldValues } from "react-hook-form";
import type { ZodErrorMap } from "zod";

const zodRuErrorMap: ZodErrorMap = (issue, _ctx) => {
  let message = "";
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Обязательное поле";
      } else {
        message = `Ожидался тип - ${issue.expected}, получено - ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Неверное значение литерала, ожидалось ${JSON.stringify(
        issue.expected,
        util.jsonStringifyReplacer,
      )}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Неверные ключи в объекте: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Результаты пересечения не могут быть объединены`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Неверное значение дискриминатора. Ожидалось ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Неверное значение перечисления. Ожидалось ${util.joinValues(
        issue.options,
      )}, получено '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Неверный тип аргументов функции`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Неверный тип возвращаемого значения функции`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Неверный формат даты`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Неверный формат: должен включать "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} на одной или более позиций больших или равных ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Неверный формат, должен начинаться с "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Неверный формат, должен заканчиваться на "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Неверный ${issue.validation}`;
      } else {
        message = "Неверный ввод";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Массив должен содержать ${
          issue.exact ? "ровно" : issue.inclusive ? `не менее` : `более`
        } ${issue.minimum} элемента(ов)`;
      else if (issue.type === "string")
        message = `Строка должна содержать ${
          issue.exact ? "ровно" : issue.inclusive ? `не менее` : `более`
        } ${issue.minimum} символа(ов)`;
      else if (issue.type === "number")
        message = `Число должно быть ${
          issue.exact ? `равно ` : issue.inclusive ? `больше или равно ` : `больше `
        }${issue.minimum}`;
      else if (issue.type === "date")
        message = `Дата должна быть ${
          issue.exact ? `равна ` : issue.inclusive ? `больше или равна ` : `больше `
        }${new Date(Number(issue.minimum)).toString()}`;
      else message = "Неверный ввод";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Массив должен содержать ${
          issue.exact ? `ровно` : issue.inclusive ? `не более` : `менее`
        } ${issue.maximum} элемента(ов)`;
      else if (issue.type === "string")
        message = `Строка должна содержать ${
          issue.exact ? `ровно` : issue.inclusive ? `не более` : `менее`
        } ${issue.maximum} символа(ов)`;
      else if (issue.type === "number")
        message = `Число должно быть ${
          issue.exact ? `равно` : issue.inclusive ? `меньше или равно` : `меньше`
        } ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Дата должна быть ${
          issue.exact ? `равна` : issue.inclusive ? `меньше или равна` : `меньше`
        } ${new Date(Number(issue.maximum)).toString()}`;
      else message = "Неверный ввод";
      break;
    case ZodIssueCode.custom:
      message = `Неверный ввод`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Результаты пересечения не могут быть объединены`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Число должно быть кратно ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Число должно быть конечным";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};

function removeEmptyFields<TFieldValues extends FieldValues>(data: TFieldValues) {
  const newData = { ...data };
  Object.keys(newData).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- we don't know what comes from the form
    const value = newData[key];

    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- I guess it's fine since we're duplicating the object
      delete newData[key];
    }
  });
  return newData;
}

export const customZodResolver: Resolver = (schema) => (values, ctx, options) => {
  const nonEmptyValues = removeEmptyFields(values);

  return zodResolver(schema, {
    errorMap: zodRuErrorMap,
  })(nonEmptyValues, ctx, options);
};
