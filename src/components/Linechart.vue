<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Line,
  name: 'Linechart',
  data() {
    return {
      options: {
        layout: {
          padding: {
              left: 10,
              right: 23,
              top: 23,
              bottom: 10
          }
        }, 
        legend: { 
          display: false 
        }, 
        responsive: true, 
        maintainAspectRatio: false
      }
    }
  },
  mixins: [reactiveProp],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
