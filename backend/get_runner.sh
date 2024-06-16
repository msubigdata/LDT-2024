# shellcheck disable=SC1083
if [[ $(git submodule status | grep runner | awk {'print $2'}) == "runner" ]]; then
  echo "Runner submodule attached"
else
  echo "Runner submodule not attached"
  rm -rf runner
  touch .gitmodules
  git submodule add -f -b master git@github.com:bigpe/EnvironmentRunner.git runner
fi

if test -f "runner/runner.sh"; then
  bash "runner/runner.sh"
else
  echo "Runner submodule not exist"
  echo "Download runner"
  git submodule update --init --recursive
fi
