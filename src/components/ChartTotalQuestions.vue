<template>
  <div class="bg-white" >
    <canvas   id="myChartTotalQuestions"></canvas>


  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  props: {
    urlParam: String, // Define the prop
  },
  data() {
    return {
      questionStates: [],
      quizData: [],
      myChart: null,
    }
  },

  methods: {
    loadQuizData() {
      // Load data from localStorage
      const filePath = `src/assets/${this.urlParam}.json`;
      const savedState = localStorage.getItem(filePath);


      if (savedState) {
        const parsedState = JSON.parse(savedState);

        this.questionStates = parsedState[filePath].questionStates;

        this.processAndDisplayData();
      } else {
        console.log("No quiz data found in local storage.");
      }
    },
    processAndDisplayData() {
      // Process data here and ensure no recursive calls
      const chartData = this.prepareChartData(this.questionStates);

      if (chartData) {
        this.updateChart(chartData.labels, chartData.data);
      }
    },
    isCurrentWeek(dateStr) {
      const date = new Date(dateStr);
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const dayOfWeek = now.getDay();
      const firstDayOfWeek = new Date(now - dayOfWeek * oneDay); // Starting from Sunday
      firstDayOfWeek.setHours(0, 0, 0, 0); // Clear time part

      return date >= firstDayOfWeek && date <= now;
    },


    prepareChartData() {
      const last7Days = this.getLast7Days();
      let questionsByDay = {}; // Object to hold total questions per day

      // Initialize questionsByDay with last 7 days
      last7Days.forEach(day => questionsByDay[day] = 0);

      // Iterate over questionStates to populate questionsByDay
      this.questionStates.forEach(question => {
        const dateStr = this.formatDate(new Date(question.answerDate));
        if (questionsByDay.hasOwnProperty(dateStr)) {
          questionsByDay[dateStr] += 1; // Increment count for the day
        }
      });

      // Extract data for the chart
      const data = last7Days.map(day => questionsByDay[day]);
      this.updateChart(last7Days, data);
    },


    getLast7Days() {
      const dates = [];
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(this.formatDate(date)); // Format the date as 'YYYY-MM-DD' or another format
      }
      return dates;
    },
    formatDate(date) {
      // return date.toISOString().split('T')[0];
      return (date.getMonth() + 1) + '/' + date.getDate();
    },

    updateChart(labels, data) {

      // Checks if chart is already initialized
      if (this.myChart) {
        this.myChart.data.labels = labels;
        this.myChart.data.datasets[0].data = data;
        this.myChart.update();
      } else {
        // Chart initialization logic if not already done
        this.initializeChartWithData(labels, data);
      }
    },

    initializeChartWithData(labels, data) {
      var ctx = document.getElementById('myChartTotalQuestions').getContext('2d');
      if (this.myChart) {
        this.myChart.destroy(); // Destroy existing chart instance if it exists
      }
      this.myChart = new Chart(ctx, {
        type: 'bar', // Or 'line', 'pie', etc.
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Questions Answered',
            data: data,
            backgroundColor: '#5372ff',

            borderWidth: 1,
            borderRadius: 20
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                display: false, // This will remove the y-axis grid lines
              }
            },
            x: {
              grid: {
                drawBorder: false,
                display: false, // This will remove the x-axis grid lines
              }
            }
          },
        }
      });
    },

  },


  mounted() {

    this.loadQuizData(); // Load and then update the chart with actual data
  }

}
</script>
