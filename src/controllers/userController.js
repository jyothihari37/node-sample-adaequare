const userModel = require('../models/userModel');
const unirest = require("unirest");
const cheerio = require("cheerio");
const xlsx = require('xlsx');

var chartsData =[
    {
        "order": 1,
        "period": "2019",
        "value": "575"
    },
    {
        "order": 2,
        "period": "2018",
        "value": "580"
    },
    {
        "order": 3,
        "period": "2017",
        "value": "603"
    },
    {
        "order": 4,
        "period": "2016",
        "value": "568"
    },
    {
        "order": 5,
        "period": "2015",
        "value": "565"
    },
    {
        "order": 6,
        "period": "2014",
        "value": "519"
    },
    {
        "order": 7,
        "period": "2013",
        "value": "459"
    },
    {
        "order": 8,
        "period": "2012",
        "value": "422"
    },
    {
        "order": 9,
        "period": "2011",
        "value": "347"
    },
    {
        "order": 10,
        "period": "2010",
        "value": "320"
    },
    {
        "order": 11,
        "period": "2009",
        "value": "294"
    },
    {
        "order": 12,
        "period": "2008",
        "value": "245"
    },
    {
        "order": 13,
        "period": "2007",
        "value": "565"
    },
    {
        "order": 14,
        "period": "2006",
        "value": "718"
    },
    {
        "order": 15,
        "period": "2005",
        "value": "882"
    }
]
async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Please provide both username and password' });
        return;
    }

    try {
        const user = await userModel.getUserByUsernameAndPassword(username, password);
        console.log("user", user);
        if (user.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        // Authentication successfull
        res.json({
            userId: user[0].USER_ID,
            roleId: user[0].ROLE_ID,
            roleName: user[0].ROLENAME,
            message: 'Authentication successful',
            status: 'success',
            statusCode: 200
        });
    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Create a function to handle GET requests for user information
async function getUser(req, res) {
    try {
        const userId = req.params.userid;
        const user = await userModel.getUserById(userId);

        res.json(user);
    } catch (err) {
        console.error('Error getting user information:', err);
        res.status(500).send('Error getting user information');
    }
}


async function getAllUsers(req, res) {
    try {
        const userInfo = await userModel.getUsersInfo();
        res.json(userInfo);
    } catch (err) {
        console.error('Error getting user information:', err);
        res.status(500).send('Error getting user information');
    }
}

async function getChartsData(req, res) {
    var data = chartsData;
    res.send(data);
}

async function getCompnayList(req, res) {
    try {
        const companyInfo = await userModel.getCompnayList();
        res.json(companyInfo);
    } catch (err) {
        console.error('Error getting company information:', err);
        res.status(500).send('Error getting company information');
    }
}

async function getProjectListBasedOnCompanyId(req, res) {
    try {
        const projectId = req.params.projectId;
        const projectInfo = await userModel.getProjectListBasedOnCompanyId(projectId);

        res.json(projectInfo);
    } catch (err) {
        console.error('Error getting project information:', err);
        res.status(500).send('Error getting project information');
    }
}

async function getEmployeesDataBasedOnLogin(req, res) {
    try {
        const loginUserID = req.params.loginUserID;
        const employees = await userModel.getEmployeesDataBasedOnLogin(loginUserID);

        res.json(employees);
    } catch (err) {
        console.error('Error getting employyes information:', err);
        res.status(500).send('Error getting employees information');
    }
}

async function getRolesBasedOnRoleId(req, res) {
    try {
        const roleId = req.params.roleid;
        const roles = await userModel.getRoles(roleId);

        res.json(roles);
    } catch (err) {
        console.error('Error getting roles information:', err);
        res.status(500).send('Error getting roles information');
    }
}


async function signup(req, res) {
    try {
        //const userId = req.params.userid;
        const user = await userModel.signup(req.body);
        console.log("user in controller", user)
        res.json({
            //userId: user.USER_ID,
            message: 'User Created successfully',
        });
    } catch (err) {
        console.error('Error creating user information:', err);
        res.status(500).send('Error creating user information');
    }
}



function getWebsitesList(req, res) {
    //let serachQry="google+search+and+get+first+search+result+in+node+js"
    //let serachQry="google search and get first search result in node js";
    let serachQry = req.params.searchQuery;
    serachQry = serachQry.replace(" ", "+")
    return unirest
        .get("https://www.google.com/search?q=" + serachQry + "&gl=us&hl=en")
        .headers({
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        })
        .then((response) => {
            let $ = cheerio.load(response.body);
            let links = [];
            $(".yuRUbf > a").each((i, el) => {
                links[i] = $(el).attr("href");
            });   
            const organicResults = [];
            for (let i = 0; i < titles.length; i++) {
                organicResults[i] = {   
                    links: links[i],
                };
            }
            res.json({
                siteLinks: organicResults
            });
        });
};



function getWebsitesList(req, res) {
  const workbook = xlsx.readFile('company_list.xlsx'); // Replace 'company_list.xlsx' with the path to your Excel file
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const companyData = xlsx.utils.sheet_to_json(worksheet);

  const results = [];
  let count = 0;

  function processCompany() {
    if (count < companyData.length) {
      const searchQuery = companyData[count].searchQuery;
      const formattedQuery = searchQuery.replace(' ', '+');

      unirest
        .get(`https://www.google.com/search?q=${formattedQuery}&gl=us&hl=en`)
        .headers({
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
        })
        .then((response) => {
          let $ = cheerio.load(response.body);

          let links = [];

          $('.yuRUbf > a').each((i, el) => {
            links.push($(el).attr('href'));
          });

          const topLinks = links.slice(0, 3); // Retrieve only the top 3 links

          results.push({
            searchQuery,
            siteLinks: topLinks,
          });

          count++;
          processCompany();
        });
    } else {
      // Save results to Excel file
      const newWorkbook = xlsx.utils.book_new();
      const newData = results.map(({ searchQuery, siteLinks }) => ({
        'Search Query': searchQuery,
        'Site Links': siteLinks.join('\n'),
      }));
      const newWorksheet = xlsx.utils.json_to_sheet(newData);
      xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Results');
      xlsx.writeFile(newWorkbook, 'results.xlsx'); // Replace 'results.xlsx' with the desired output file name

      res.json({
        success: true,
        message: 'Results saved to Excel file.',
      });
    }
  }

  processCompany();
}
//Remember to install the required dependencies by running npm install xlsx before using the updated code.

module.exports = {
    login, getUser, getAllUsers, getEmployeesDataBasedOnLogin,
    getRolesBasedOnRoleId, signup, getWebsitesList,getCompnayList ,getProjectListBasedOnCompanyId,getChartsData
};
