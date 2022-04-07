const core = require('@actions/core');
const fetch = require('cross-fetch');
const base64 = require('base-64');

try {
  const transitionTo = core.getInput('transition-to');
  const issueKey = core.getInput('issue-key');
  const jiraBaseUrl = core.getInput('jira-base-url');
  const jiraUserEmail = core.getInput('jira-user-email');
  const jiraApiToken = core.getInput('jira-api-token');
  const url = `${jiraBaseUrl}/rest/api/3/issue/${issueKey}/transitions`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + 
      base64.encode([jiraUserEmail, jiraApiToken].join(':'))
    }
  };

  // get list of transitions for this issue
  fetch(url, {
    ...options, 
    method: 'GET'
  })
  .then(res => res.json())
  .then(json => json.transitions)
  .then(transitions => {
    // make sure this issue is attached to a workflow
    if(!transitions || transitions.length == 0)
      throw 'No transitions list found - check your workflow';

    // find transition id
    transitions.forEach(transition => {
      if(transition.to['name'].toLowerCase() == transitionTo.toLowerCase())
        transition_id = transition.id;
    });
    
    // transition state is not available
    if(!transition_id) 
      throw 'Could not find status - check your workflow';
  
    return transition_id;
  })
  .then(id => {
    // transition issue to transition-id
    fetch(url, {
      ...options, 
      method: 'POST', 
      body: JSON.stringify({ 
        "transition": { 
          "id": id 
        } 
      })
    });
  });
} catch (error) {
  core.setFailed(error.message);
}
