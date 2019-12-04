#!/bin/bash
PARENT_COMMIT_COUNT="$(git log --format=%P HEAD -n 1 | wc -w | xargs)"

# When we are operating on a merge commit, target the last commit in the PR branch
PREVIOUS_COMMIT_TARGET="$(if [[ $PARENT_COMMIT_COUNT == "2" ]]; then echo HEAD^2; else echo HEAD; fi)"

PREVIOUS_COMMIT_MESSAGE="$(git log --format=%B -n 1 $PREVIOUS_COMMIT_TARGET)"

# Set up .netrc file with GitHub credentials
# found here: https://github.com/EndBug/add-and-commit/blob/master/entrypoint.sh
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
    # # TODO: Update remote URL to main repo
    # REPO_URL=https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
    
    # # Allows fetching and checking out other branches
    # git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

    # # Allows pushing to remote
    # git remote set-url origin ${REPO_URL}
    # echo $REPO_URL

    git checkout ${GITHUB_REF#refs/heads/}

    # Commit new snapshots and push to repo
    git add ./tests/functional/snapshots
    git commit -m "chore: update snapshots [skip ci]"
    git push
fi