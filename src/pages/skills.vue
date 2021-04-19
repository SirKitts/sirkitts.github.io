<template>
  <div class="skills-container">
    <h1 class="title">
      technical skills
    </h1>
    <div class="skills-sets__container">
      <SkillsSets :key="ptr" :skill="skill" />
      <button
        class="skills-btn skills-btn--left"
        @click="updatePtr(false)"
      >
        <i class="fas fa-arrow-circle-left fa-2x arrow-color" :style="styleObject" />
      </button>
      <button
        class="skills-btn skills-btn--right"
        @click="updatePtr(true)"
      >
        <i class="fas fa-arrow-circle-right fa-2x arrow-color" :style="styleObject" />
      </button>
    </div>
  </div>
</template>

<script>
const SkillsSets = () => import(
  /* webpackChunkName: "skills-sets-component" */ '@/components/SkillsSets'
);

export default {
  name: 'Skills',
  components: {
    SkillsSets
  },
  data () {
    return {
      ptr: 0,
      styleObject: {},
      skill: {},
      skills: [
        {
          name: 'Frontend Skills',
          rate: 'Strong Knowledge.',
          desc1: 'Ability to create templates, components and widgets for web site.',
          desc2: 'Have strong experienced in creating content management system, website and its maintenance or support.',
          barcolor: 'green',
          icon: 'fas fa-puzzle-piece fa-2x',
          technologies: [
            { name: 'HTML', proficiency: '100%' },
            { name: 'CSS', proficiency: '100%' },
            { name: 'Javascript', proficiency: '100%' },
            { name: 'React', proficiency: '80%' },
            { name: 'Vue.js', proficiency: '85%' },
            { name: 'Wordpress', proficiency: '80%' }
          ]
        },
        {
          name: 'Backend Skills',
          rate: 'Strong Knowledge.',
          desc1: 'Have experienced in creating and maintenance of API used in frontend site rendering.',
          desc2: '',
          barcolor: 'orange',
          icon: 'fas fa-server fa-2x',
          technologies: [
            { name: 'Node.js', proficiency: '90%' },
            { name: 'Php', proficiency: '90%' },
            { name: 'Java', proficiency: '80%' },
            { name: 'Groovy', proficiency: '80%' },
            { name: 'Springboot', proficiency: '80%' }
          ]
        },
        {
          name: 'Database Skills',
          rate: 'Strong Knowledge.',
          desc1: 'Thorough knowledge and understanding of database structures and experience with CRUD development using different DB technologies.',
          desc2: 'Strong background in relational databases and knowledge with NoSQL.',
          barcolor: '#316ba3',
          icon: 'fas fa-database fa-2x',
          technologies: [
            { name: 'MySQL', proficiency: '90%' },
            { name: 'AWS DynamoDB', proficiency: '70%' },
            { name: 'MicrosoftSQL', proficiency: '90%' },
            { name: 'MongoDB', proficiency: '80%' }
          ]
        },
        {
          name: 'Cloud Skills',
          rate: 'Strong Knowledge.',
          desc1: 'Have knowledge in creating AWS EC2 instances, Beanstalk and S3 services.',
          desc2: 'Acquired some AWS training certification.',
          barcolor: 'skyblue',
          icon: 'fas fa-cloud fa-2x',
          technologies: [
            { name: 'EC2', proficiency: '90%' },
            { name: 'S3', proficiency: '95%' },
            { name: 'Elastic Beanstalk', proficiency: '80%' },
            { name: 'Lambda', proficiency: '80%' },
            { name: 'IAM', proficiency: '85%' }
          ]
        },
        {
          name: 'Other Skills',
          rate: 'Strong Knowledge.',
          desc1: 'Uses Git or CLI when doing development. Used jira to tracked work for sprint planning.',
          desc2: 'Created deployment plan through bamboo',
          barcolor: 'yellowgreen',
          icon: 'fas fa-signature',
          technologies: [
            { name: 'Git', proficiency: '80%' },
            { name: 'CLi', proficiency: '80%' },
            { name: 'Jira', proficiency: '90%' },
            { name: 'Bamboo', proficiency: '90%' }
          ]
        }
      ]
    }
  },
  created () {
    this.skill = this.skills[this.ptr]
    this.styleObject = {
      color: this.skill.barcolor
    }
  },
  methods: {
    updatePtr (isNextBtn) {
      (isNextBtn)
        ? (this.ptr >= this.skills.length - 1) ? this.ptr = 0 : this.ptr += 1
        : (this.ptr <= 0) ? this.ptr = this.skills.length - 1 : this.ptr -= 1
      this.skill = this.skills[this.ptr]
      this.styleObject = {
        color: this.skill.barcolor
      }
    }
  }
}
</script>

<style>
</style>
