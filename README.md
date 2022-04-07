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
  uses: beachyapp/jira-get-issue-key-action@v0.1
  with:
    search: '${{ github.event.pull_request.head.ref }}'
<!-- transition issue to a new workflow status -->
- name: Transition JIRA issue
  if: ${{ steps.issue-key-from-branch-name.outputs.exists }}
  uses: beachyapp/jira-transition-issue-action@v0.1
  with:
    transition-to: "In Development"
    issue-key: ${{steps.issue-key-from-branch-name.outputs.key}}
    jira-user-email: ${{ secrets.JIRA_USER_EMAIL }}
    jira-api-token: ${{ secrets.JIRA_API_TOKEN }}
    jira-base-url: ${{ secrets.JIRA_BASE_URL }}
```
