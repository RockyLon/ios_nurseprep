<template>
  <div class="bg-white">
    <canvas id="myChart"></canvas>


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
      const filePath = `src/assets/${this.urlParam}.json`;

      // Load data from localStorage
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
      // Generate labels for the last 7 days, including today
      const last7Days = this.getLast7Days();
      let dailyScores = {}; // Store daily correct counts and total attempts

      // Initialize dailyScores with dates and zeroed scores
      last7Days.forEach(day => {
        dailyScores[day] = { correct: 0, total: 0 };
      });

      // Populate dailyScores with data from questionStates
      this.questionStates.forEach(question => {
        const answerDate = this.formatDate(new Date(question.answerDate));
        if (dailyScores.hasOwnProperty(answerDate)) {
          dailyScores[answerDate].total += 1; // Increment total attempts for the day
          if (question.didAnswerCorrect) {
            dailyScores[answerDate].correct += 1; // Increment correct count if the answer was correct
          }
        }
      });

      // Calculate scores as percentages
      const scores = last7Days.map(day => {
        if (dailyScores[day].total > 0) {
          return ((dailyScores[day].correct / dailyScores[day].total) * 100).toFixed(1); // Calculate percentage
        }
        return 0; // Return 0 if there were no attempts that day to avoid division by zero
      });

      this.updateChart(last7Days, scores);
    },
    getLast7Days(n) {
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
      var ctx = document.getElementById('myChart').getContext('2d');
      if (!this.myChart) {
        this.myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Score Percentage',
              data: data,
              backgroundColor: '#5472ff', // For example

              tension: 0.4

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
            tooltips: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.yLabel + '%';
                }
              }
            }
          }
        });
      } else {
        this.myChart.data.labels = labels;
        this.myChart.data.datasets[0].data = data;
        this.myChart.update();
      }
    },

  },


  mounted() {

    this.loadQuizData(); // Load and then update the chart with actual data
  }

}
</script>
