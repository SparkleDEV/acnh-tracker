<template>
	<li class="sidelink-entry">
		<a class="sidelink--link" :href="path" :target="external ? '_blank' : '_self'">
			<div class="sidelink--icon">
				<img :src="icon" />
			</div>
			<div class="sidelink--text">
				<span>{{ text }}</span>
			</div>
		</a>
	</li>
</template>

<script>
export default {
	props: ['icon', 'text', 'external', 'path']
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

$icon-size-value: 30;
$icon-size: rem-calc($icon-size-value);

$link-padding-value: 8;
$link-padding: rem-calc($link-padding-value);

$link-background: #3fe039;

.sidelink-entry {
	list-style: none;
	background-color: $link-background;
	border: 1px solid mix($link-background, $black, 87);
	border-right: none;
	width: fit-content;
	border-radius: 4px 0 0 4px;
	font-size: calc($icon-size - 4px);
	margin-bottom: rem-calc(4);
	transform: translateX(calc(100% - #{rem-calc($link-padding-value * 2 + $icon-size-value)}));
	transition: transform 0.2s;

	&:hover {
		transform: translateX(0);
	}
}

.sidelink--link {
	padding: $link-padding;
	display: flex;
	width: fit-content;
	color: $white;
	text-decoration: none;
	justify-content: center;
	align-items: center;
}

.sidelink--icon {
	width: $icon-size;
	height: $icon-size;
	margin-right: $link-padding;

	img {
		width: 100%;
		height: 100%;
	}
}

.sidelink--text {
	margin: 0 rem-calc(8);
	text-shadow: 1px 1px 2px rgba($black, 0.25);
}
</style>
