#!/bin/bash

PARENT_COMMIT_COUNT="$(git log --format=%P HEAD -n 1 | wc -w | xargs)"

# When we are operating on a merge commit, target the last commit in the PR branch
LAST_COMMIT_TARGET="$(if [[ $PARENT_COMMIT_COUNT == "2" ]]; then echo HEAD^2; else echo HEAD; fi)"

LAST_COMMIT_MESSAGE="$(git log --format=%B -n 1 $LAST_COMMIT_TARGET)"

echo "Didn't find trigger commit message, skipping snapshot update..."
echo "::set-env name=LAST_COMMIT_MESSAGE::$LAST_COMMIT_MESSAGE"