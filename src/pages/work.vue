<template>
  <div class="work-container">
    <h1 class="title">
      work experience
    </h1>
    <div class="work__experience-text">
      Company
    </div>
    <div class="work__experience-logos">
      <div class="work__experience--sparesbox">
        <img src="https://sirkitts.github.io/resume/images/sparesbox.svg" width="120" height="50" v-on:click="updateHistory(0)">
      </div>
      <div class="work__experience--foxsports">
        <img src="https://sirkitts.github.io/resume/images/foxsports.png" width="50" height="50" v-on:click="updateHistory(1)">
      </div>
      <div class="work__experience--newscomau">
        <img src="https://sirkitts.github.io/resume/images/newscomau.svg" width="150" height="40" v-on:click="updateHistory(2)">
      </div>
    </div>
    <div class="work__history">
      <WorkHistory :history="history[ ptr ]" />
    </div>
    <div v-if="projects.length && toggle.projects" class="work__projects">
      <Carousel title="Projects" :items="projects" />
      <ImageCredit />
    </div>
    <div v-if="achievements.length && toggle.achievements" class="work__achievements">
      <WorkAchievements :achievements="achievements" />
    </div>
    <div v-if="responsibilities.length && toggle.responsibilities" class="work__responsibilities">
      <WorkResponsibilities :responsibilities="responsibilities" />
    </div>
    <div class="work__buttons">
      <button v-if="projects.length" class="btn work__buttons-btn" v-on:click="toggleProjects()">
        View projects
      </button>
      <button v-if="achievements.length" class="btn work__buttons-btn" v-on:click="toggleAchievements()">
        View achievements
      </button>
      <button v-if="responsibilities.length" class="btn work__buttons-btn" v-on:click="toggleResponsibilities()">
        Work and responsibilities
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Work',
  components: {},
  data () {
    return {
      ptr: 1,
      toggle: {
        projects: false,
        achievements: false,
        responsibilities: false
      },
      projects: [],
      achievements: [],
      responsibilities: [],
      history: [
        {
          year: 'MAR 2021 - AUG 2020',
          job: 'FRONTEND DEVELOPER',
          company: {
            name: 'GPC AUSTRALIA, SPARESBOX PTY LTD',
            desc: 'Sparesbox is a subsidiary of Genuine Parts Australia is a service organization engaged in the distribution of automotive and industrial replacement parts and materials.',
            url: 'https://www.sparesbox.com.au/'
          },
          roles: [
            'Responsible for maintenance and support of the current ecommerce website.',
            'Proposed solutions on how to migrate current website to vuestorefront.',
            'Write technical scoping and documentations.'
          ],
          projects: [
            {
              year: 'Mar 2021-Jan 2021',
              keyProjects: [
                'Created POC from react to vuestorefront website',
                'Documentation of current react website'
              ],
              technologies: 'Vuejs, Nuxt'
            },
            {
              year: 'Dec 2020-Aug 2020',
              keyProjects: [
                'Maintenance, support of current website',
                'Loqate address integration in checkout',
                'Braintree integration into vuestorefront'
              ],
              technologies: 'React, Node'
            }
          ],
          achievements: [],
          responsibilities: []
        },
        {
          year: 'APR 2020 - AUG 2006',
          job: 'SENIOR WEB DEVELOPER',
          company: {
            name: 'FOXSPORTS AUSTRALIA PTY LTD',
            desc: 'Fox Sports Australia is owned by Foxtel and is a subsidiary of News Corp Australia whose primary business is in media particular in sports content and stats distributions.',
            url: 'https://www.foxsports.com.au/'
          },
          roles: [
            'Have experienced in designing and developing website for Fox Sports.',
            'Most work are both in frontend site rendering and/or creating backend CMS or API.',
            'Responsible for the maintenance and support of the product.'
          ],
          projects: [
            {
              year: '2020',
              keyProjects: [
                'Maintenance and support of Stats API',
                'Integration of Video transferring from XSquare'
              ],
              technologies: 'XSquare, Java, Groovy, Springboot, MSSQL'
            },
            {
              year: '2020-2019',
              keyProjects: [
                'Ads Admin tool (E-commerce tools)',
                'Video Playlist Monitoring tool'
              ],
              technologies: 'Vue.js, Vuematerial, React'
            },
            {
              year: '2019-2018',
              keyProjects: [
                'Video Admin tool (DVP)'
              ],
              technologies: 'Vue.js, Vuematerial'
            },
            {
              year: '2019-2016',
              keyProjects: [
                'Integrate small widgets & components for BAU'
              ],
              technologies: 'React, WordPress'
            },
            {
              year: '2016',
              keyProjects: [
                'Recreated Fox Sports Website'
              ],
              technologies: 'WordPress, Php, Twig'
            },
            {
              year: '2011',
              keyProjects: [
                'Recreated Fox Sports Website'
              ],
              technologies: 'Fatwire, Java, Jsp'
            },
            {
              year: '2006',
              keyProjects: [
                'Created Fox Sports Website from scratch'
              ],
              technologies: 'Vignette, Tcl'
            }
          ],
          achievements: [
            {
              achievement: 'Successfully launched Fox Sports website',
              description: 'as a sole developer of Fox Sports, successfully launched the website using Vignette/Tcl technology. Integrated sports results using Perl ingestion and Oracle DB. Work with colleague with this solution. Consider as one my greatest achievements, had a pat on the back by the CTO, project manager and technology manager for doing a superb job.'
            },
            {
              achievement: 'Successfully Relaunched Website',
              description: 'successfully relaunched the Fox Sports website using FatWire technology. Responsible for the maintenance and support of the site. Successfully relaunched Fox Sports website using WordPress, PHP technology. Part of the core team that redeveloped the site.'
            },
            {
              achievement: 'Developed a plugin to ease producers/developers work',
              description: 'developed WordPress plugins, templates and widgets to be used by the producers. Created plugins that automatically embed react widgets in the site. Uses akamai edge technology in the template.'
            },
            {
              achievement: 'Developed a new Video CMS Admin tool',
              description: 'developed the presentation layer draggable CRUD content management for Video administration. Uses vue.js and vuematerial technology. The system solves the tedious and redundant process of the old video CMS.'
            },
            {
              achievement: 'Developed a Video monitoring tool',
              description: 'created a simple monitoring tool to be able to detect which video has been moved to playlist and/or missing. Uses react technology. This solved the manual monitoring using excel spreadsheet.'
            },
            {
              achievement: 'Redeveloped a video transferring API',
              description: 'redevelop the transferring API used by one of the microservices to be able to transfer and delete video using XSquare SOAP API.'
            },
            {
              achievement: 'Resolved the unsolvable',
              description: 'manage to resolve the almost a year issue and attempted to solve by few developers, that is to fix the dev/UAT test environment used by tester rather than the production. Uses AWS ec2 instance and bamboo for deployment.'
            }
          ],
          responsibilities: [
            {
              icon: 'fas fa-users about-feature__text-icon fa-2x',
              work: 'Collaborate with teams ',
              responsibilities: 'As in any projects, work with teams and internal client to gather requirements about the product. Create initial wireframes. Work with backend team regarding API requirements and structure. Work with frontend team about widgets and components to build. Help producers to create jira tasks. Assist testers on functional testing. Mentor co-developers about Vuejs and its framework. Do presentation of the product. Create documentation for users.'
            },
            {
              icon: 'fas fa-calendar-alt about-feature__text-icon fa-2x',
              work: 'Day to day BAU task',
              responsibilities: 'Responsible for creating new widgets or components as required in BAU Task. Some small projects are reusable feature template in the homepage, the players widgets in the lab page, the cricket last 6 balls, summary and current partnership widgets and the now remove Foxtel page. Responsible for the maintenance and support of the site. And making sure codes are easy to understand and reusable.'
            },
            {
              icon: 'fas fa-wrench about-feature__text-icon fa-2x',
              work: 'Maintenance and support of Stats API',
              responsibilities: 'Moved to Platform development team to help support and maintain the REST API for Sports Statistics match results.  Uses java/groovy technology on the backend. Microsoft SQL Developer for the database storage and renders it as a JSON for the frontend developer to use.'
            },
            {
              icon: 'fas fa-people-carry about-feature__text-icon fa-2x',
              work: 'Peer socialisation and learning',
              responsibilities: 'Do code reviews. Do a peer-to-peer programming with fellow developers at least once or twice a week. Do a presentation of new technology at least once a quarter. Play boardgames with peers to socialise and relieved stress.'
            }
          ]
        },
        {
          year: '1999 – 2006',
          job: 'WEB DEVELOPER',
          company: {
            name: 'NEWS INTERACTIVE PTY LTD',
            desc: '',
            url: 'https://www.news.com.au/'
          },
          roles: [
            'Have experienced in developing websites for News, Fox Sports and other masthead.',
            'Responsible in frontend site rendering like creating templates, components and widgets.',
            'Created the websites for News, Fox Sports and other mastheads.',
            'Maintenance and support of websites and it templates and components.'
          ],
          projects: [
            {
              year: '2006-2001',
              keyProjects: [
                'Created The News.com.au website',
                'Created Mastheads website',
                'Created Newsmotoring website (now Carsguide)'
              ],
              technologies: 'Vignette 5.0, Javascript, Html'
            },
            {
              year: '2001',
              keyProjects: [
                'Created The Australian website'
              ],
              technologies: 'Vignette 5.0, Javascript, Html'
            },
            {
              year: '2000',
              keyProjects: [
                'Foxsports Olympic 2000 website'
              ],
              technologies: 'Vignette 4.0, Html'
            },
            {
              year: '1999',
              keyProjects: [
                'Created GoFish auction site usinf Fairmarket'
              ],
              technologies: 'Javascript, Fairmarket'
            }
          ],
          achievements: [],
          responsibilities: []
        }
      ]
    }
  },
  created () {
    this.initToggle()
    this.initData()
  },
  methods: {
    initToggle () {
      this.toggle = {
        projects: false,
        achievements: false,
        responsibilities: false
      }
    },
    initData () {
      this.projects = this.history[this.ptr].projects
      this.achievements = this.history[this.ptr].achievements
      this.responsibilities = this.history[this.ptr].responsibilities
    },
    toggleProjects () {
      this.initToggle()
      this.toggle.projects = !this.toggle.projects
    },
    toggleAchievements () {
      this.initToggle()
      this.toggle.achievements = !this.toggle.achievements
    },
    toggleResponsibilities () {
      this.initToggle()
      this.toggle.responsibilities = !this.toggle.responsibilities
    },
    updateHistory (num) {
      this.ptr = num
      this.initData()
    }
  }
}
</script>

<style>
.carousel-container {
  width: 80vw;
}
/*
.carousel-images__btn {
  color: #000;
}
*/
</style>
