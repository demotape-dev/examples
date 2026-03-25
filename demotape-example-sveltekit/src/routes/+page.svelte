<script>
	let { data, form } = $props();
</script>

<h1>SvelteKit Items</h1>
<p>This page is server-rendered. Items are loaded via a SvelteKit load function.</p>

<form method="POST">
	<input type="text" name="name" placeholder="New item name" required />
	<button type="submit">Add</button>
</form>

{#if form?.error}
	<p style="color: #cc0000;">{form.error}</p>
{/if}

<h2>Items ({data.items.length})</h2>

{#if data.items.length === 0}
	<p>No items yet. Add one above.</p>
{:else}
	<ul>
		{#each data.items as item}
			<li>{item}</li>
		{/each}
	</ul>
{/if}
