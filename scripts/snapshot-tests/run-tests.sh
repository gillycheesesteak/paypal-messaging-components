#!/bin/bash
# parts of this script found and modified from here: https://github.com/EndBug/add-and-commit/blob/master/entrypoint.sh

PARENT_COMMIT_COUNT="$(git log --format=%P HEAD -n 1 | wc -w | xargs)"

# When we are operating on a merge commit, target the last commit in the PR branch
PREVIOUS_COMMIT_TARGET="$(if [[ $PARENT_COMMIT_COUNT == "2" ]]; then echo HEAD^2; else echo HEAD; fi)"

PREVIOUS_COMMIT_MESSAGE="$(git log --format=%B -n 1 $PREVIOUS_COMMIT_TARGET)"

# Set up .netrc file with GitHub credentials
git_setup() {
    cat <<- EOF > $HOME/.netrc
        machine github.com
        login $GITHUB_ACTOR
        password $GITHUB_TOKEN

        machine api.github.com
        login $GITHUB_ACTOR
        password $GITHUB_TOKEN
EOF
    chmod 600 $HOME/.netrc

    cat $HOME/.netrc

    git config --global user.email "actions@github.com"
    git config --global user.name "Update Snapshots"
}

if [[ $PREVIOUS_COMMIT_MESSAGE == "[update snapshot]" ]]; then 
    git_setup

    echo "127.0.0.1 localhost.paypal.com" | sudo tee -a /etc/hosts

    npm install

    npm run dev:standalone &

    sleep 20

    npm run test:func -- -u

    echo "Pushing updated snapshots to pull request branch"

    git branch ${GITHUB_REF:11}
    git checkout ${GITHUB_REF:11}

    # Commit new snapshots and push to repo
    git add ./tests/functional/snapshots
    git commit -m "chore: update snapshots [skip ci]"
    git push --set-upstream origin "${GITHUB_REF:11}"
else
    echo "Didn't find trigger commit message, skipping snapshot update..."
fi