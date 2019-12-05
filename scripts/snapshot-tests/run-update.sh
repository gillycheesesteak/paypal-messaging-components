#!/bin/bash
# parts of this script found and modified from here: https://github.com/EndBug/add-and-commit/blob/master/entrypoint.sh

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

echo CANCEL_SNAPSHOT_UPDATE
echo $CANCEL_SNAPSHOT_UPDATE

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