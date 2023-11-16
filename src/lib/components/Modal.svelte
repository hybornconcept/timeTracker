<script>
	import { Button, Modal } from 'flowbite-svelte';
	// import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	export let popupModal = false;
  

  </script>  
  

<Modal bind:open={popupModal} size="xs" autoclose>
	<slot />

</Modal>
