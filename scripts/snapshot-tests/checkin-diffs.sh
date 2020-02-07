FAILED_SNAPSHOT_BRANCH=failed-snapshots

if [[ "$TRAVIS_TEST_RESULT" != "0" ]] && [[ "$TRAVIS_PULL_REQUEST" = "true" ]]; then 
    node ./tests/functional/utils/collectDiffs.js

    mv tests/functional/__diff_output__ ../snapshots

    git checkout -b $FAILED_SNAPSHOT_BRANCH

    rm -r ./*
    mv ../snapshots .

    git add *

    COMMIT_DATE=$(date +"%Y-%m-%d %H:%M:%S")
    SNAPSHOT_COUNT=$(ls -1q ./snapshots | wc -l)

    git commit -m "$COMMIT_DATE: $SNAPSHOT_COUNT failed snapshots"

    git remote set-url origin "https://${GH_TOKEN}@github.com/${TRAVIS_PULL_REQUEST_SLUG}.git"
    git push --set-upstream origin $FAILED_SNAPSHOT_BRANCH

    SNAPSHOT_URL="https://github.com/${TRAVIS_PULL_REQUEST_SLUG}/tree/${FAILED_SNAPSHOT_BRANCH}/snapshots"
    echo "$SNAPSHOT_COUNT failed snapshots viewable at $SNAPSHOT_URL"
fi