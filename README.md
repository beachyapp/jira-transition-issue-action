# JIRA transition issue action

This action will transition an issue in JIRA based on issue key and transition-to values
  
## Inputs

## `transition-to`

**Required** What workflow status you want to transition to?

## `issue-key`

**Required** The issue key you want to transition

## `jira-user-email`

**Required** JIRA user email

## `jira-api-token`

**Required** JIRA API token

## `jira-base-url`

**Required** JIRA base URL

## Example usage

```
<!-- get issue-key from branch name-->
- name: Find JIRA issue key by branch name
  id: issue-key-from-branch-name
  uses: beachyapp/jira-get-issue-key-action@v0.2
  with:
    search: '${{ github.event.pull_request.head.ref }}'
<!-- transition issue to a new workflow status -->
- name: Transition JIRA issue
  if: ${{ steps.issue-key-from-branch-name.outputs.exists }}
  uses: beachyapp/jira-transition-issue-action@v0.2
  with:
    transition-to: "In Development"
    issue-key: ${{steps.issue-key-from-branch-name.outputs.key}}
    jira-user-email: ${{ secrets.JIRA_USER_EMAIL }}
    jira-api-token: ${{ secrets.JIRA_API_TOKEN }}
    jira-base-url: ${{ secrets.JIRA_BASE_URL }}
```

## Compiling and pushing changes

Checking in your node_modules directory can cause problems. As an alternative, you can use a tool called @vercel/ncc to compile your code and modules into one file used for distribution.

Install vercel/ncc by running this command in your terminal.

`npm i -g @vercel/ncc`

Compile your index.js file.

`ncc build index.js --license licenses.txt`

You'll see a new dist/index.js file with your code and the compiled modules. You will also see an accompanying dist/licenses.txt file containing all the licenses of the node_modules you are using.

Change the main keyword in your action.yml file to use the new dist/index.js file.

`main: 'dist/index.js'`

If you already checked in your node_modules directory, remove it.

`rm -rf node_modules/*`

From your terminal, commit the updates to your action.yml, dist/index.js, and node_modules files.

```shell
git add action.yml dist/index.js node_modules/*
git commit -m "Use vercel/ncc"
git tag -a -m "My first action release" v1.1
git push --follow-tags
```
