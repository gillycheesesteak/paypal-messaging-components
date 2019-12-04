#!/bin/bash
PARENT_COMMIT_COUNT="$(git log --format=%P HEAD -n 1 | wc -w | xargs)"

# When we are operating on a merge commit, target the last commit in the PR branch
PREVIOUS_COMMIT_TARGET="$(if [[ $PARENT_COMMIT_COUNT == "2" ]]; then echo HEAD^2; else echo HEAD; fi)"

PREVIOUS_COMMIT_MESSAGE="$(git log --format=%B -n 1 $PREVIOUS_COMMIT_TARGET)"

echo GITHUB_REPOSITORY
echo $GITHUB_REPOSITORY
echo GITHUB_REF
echo $GITHUB_REF
echo GITHUB_HEAD_REF
echo $GITHUB_HEAD_REF
echo GITHUB_BASE_REF
echo $GITHUB_BASE_REF

if [[ $PREVIOUS_COMMIT_MESSAGE == "[update snapshot]" ]]; then 
    npm run test:func -- -u

    echo "Pushing updated snapshots to pull request branch"
    {
        # TODO: Update remote URL to main repo
        REPO_URL=https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
        
        # Allows fetching and checking out other branches
        git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

        # Allows pushing to remote
        git remote set-url origin ${REPO_URL}
    } &> /dev/null

    # Switch to pull request branch
    git checkout $GITHUB_REF

    # Commit new snapshots and push to repo
    git add ./tests/functional/snapshots
    git commit -m "chore: update snapshots [skip ci]"
    git push
else 
    npm run test:func
fi