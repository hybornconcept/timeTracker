
<script>
// export let color
export let status


const color = status === 'Present' ? 'green' : status === 'Absent' ? 'red' : 'yellow';
</script>

<span class='bg-{color}-100 text-{color}-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-{color}-900 dark:text-{color}-300'>{status}</span>