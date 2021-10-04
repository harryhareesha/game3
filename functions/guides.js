exports.handler = async (event, context) => {
  const guides = [
    {
      img: 'caleb-castro-PM-personally-appreciates2',
      title: 'Poineering and steering the epic attachments',
      snippet: 'In this project, details had to be ironed out, and multi-platform implementation of the epic attachments had to be completed in timely fashion',
      author: 'Castro Caleb, PM'
    },
    {
      img: 'Android-Team-appreciates',
      title: 'Task to generate file size from Uri',
      snippet: 'In this task, part of the messaging module. When the patient selects an image to upload to the CA / Provider, it is uploaded to the target system. However, target system quitely rejects the larger files, after the fact. So, determine the file size and inform the patient about the error possibility',
      author: 'Android Team'
    },
   
    {
      img: 'Chris-V-Android-inhouse-Lead3',
      title: 'Chris Vanso, android in-house moible team lead appreciates',
      snippet: 'In this project, Billing features of the Epic Transition project, implemented in the Android Flagship App. Involved patient delegates, owner(s). Multiple billing accounts, and summary of the accounts, and itemized details of the specific account when selected',
      author: 'Chris Vanso, Lead'
    },
    {
      img: 'assisting-peer-iOS-Juliano',
      title: 'Cross-platform leading, and assisting. iOS lead appreciates',
      snippet: 'In this project, I pioneered and steered the multi-platform implementation of medications refills feature, for the Epic EMR transition. Task involved reconciliatin of the pre-existing medications, and reconciliation, CA enabled interaction, etc',
      author: 'Juliano Alvarenga, iOS Lead'
    }

  ]

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides)
    }
  }
  return {
    statusCode: 401,
    body: JSON.stringify({ msg: 'oh! unauthorized. Please sign in OR request to sign up' })
  }

}