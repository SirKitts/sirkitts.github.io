<template>
  <div class="about-container">
    <h1 class="title">
      About Me
    </h1>
    <div class="about-qualification">
      <h3>Qualification:</h3> {{ qualification }}
    </div>
    <div class="about-feature">
      <div class="about-feature__photo" />
      <div class="about-feature__text">
        <h2>
          <i class="fas fa-graduation-cap about-feature__text-icon fa-2x" />
          Education
        </h2>
        <ul class="about-education">
          <li
            v-for="(educ, index) in education"
            :key="index"
          >
            <h4>{{ educ.degree }} | {{ educ.year }} | {{ educ.school }}</h4>
            <p>{{ educ.award }}</p>
          </li>
        </ul>
      </div>
    </div>
    <h3>
      Key Competencies:
    </h3>
    <p>
      {{ competencies[0] }} {{ competencies[1] }}
    </p>
    <div class="about-skills">
      <div
        v-for="(myskill, index) in myskills"
        :key="index"
      >
        <i :class="myskill.icon" class="about-skills__icon" />
        <h3>{{ myskill.title }}</h3>
        <p>{{ myskill.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {},
  data () {
    return {
      qualification: 'I have a relevant degree and qualifications with more than a decade of experience in programming, analysis and design of small to large website development projects.',
      competencies: [
        'I have a strong knowledge and experience in using diverse technology both in front and back end web development.',
        'I am a fast learner, have transferable skills and passion for emerging technologies.'
      ],
      education: [
        {
          degree: 'MS COMPUTER SCIENCE',
          year: '1992',
          school: 'ATENEO DE MANILA UNIVERSITY, PHILIPPINES',
          award: 'Units Earned: 12 units'
        },
        {
          degree: 'BS COMPUTER ENGINEERING',
          year: '1990',
          school: 'ADAMSON UNIVERSITY, PHILIPPINES',
          award: 'Award: Community Leadership Award'
        }
      ],
      myskills: [
        {
          icon: 'fas fa-users-cog fa-4x',
          title: 'Transferable skills',
          desc: 'I have used technologies like React, Vue.js and WordPress in frontend development and Php, java and spring boot in backend development.'
        },
        {
          icon: 'fas fa-sitemap fa-4x',
          title: 'Agile',
          desc: 'I worked in an agile environment and can work independently or with a team.'
        },
        {
          icon: 'fas fa-chalkboard-teacher fa-4x',
          title: 'Mentoring',
          desc: 'I mentor junior developers and can act as a lead developer.'
        },
        {
          icon: 'fas fa-thumbs-up fa-4x',
          title: 'Passion',
          desc: 'I have a passion to learn new skills and technologies specially in web development.'
        }
      ]
    }
  }
}
</script>

<style>
.about-container {
  margin: 0 auto;
  min-height: 80vh;
  width: 80%;
}

.title {
  margin: 0.5rem auto;
  width: 100%;
  text-transform: capitalize;
}

.about-feature {
  display: grid;
  grid-template-areas:
    'photo text text text'
    '... text text text';
  grid-gap: 1rem;
  padding: 1rem;

  /* height: 40vh; */
}

.about-feature__photo {
  display: grid;
  grid-area: photo;

  background:
    url('https://sirkitts.github.io/resume/images/jose.quitain.jpg')
    no-repeat center center / contain;
  width: 15rem;
  height: 15rem;
}

.about-feature__text {
  display: grid;
  grid-area: text;
}

.about-feature__text-icon {
  color: green;
  transform: scale(0.8);
}

.about-skills {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  margin: 1.5rem 0;
}

.about-skills h3 {
  text-align: center;
  margin: 1rem 0;
}

.about-skills__icon {
  display: grid;
  color: green;
  text-align: center;
}

.about-skills__icon:hover {
  transform: scale(1.2);
}

/* $breakpoint-small */
@media only screen and (max-width: 37.5em) {
  .about-feature__photo {
    width: 5rem;
    height: 5rem;
  }
  .about-feature__photo {
    width: 5rem;
    height: 5rem;
  }
  .about-skills {
    grid-template-columns: 1fr;
  }
}
</style>
