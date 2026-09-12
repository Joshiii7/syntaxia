<template>
	<div class="scene rotateX" aria-hidden="true">
		<div class="cube">
			<div class="front">
				<span v-for="n in 9" :key="'f' + n"></span>
			</div>
			<div class="back">
				<span v-for="n in 9" :key="'b' + n"></span>
			</div>
			<div class="right">
				<span v-for="n in 9" :key="'r' + n"></span>
			</div>
			<div class="left">
				<span v-for="n in 9" :key="'l' + n"></span>
			</div>
			<div class="top">
				<span v-for="n in 9" :key="'t' + n"></span>
			</div>
			<div class="bottom">
				<span v-for="n in 9" :key="'bo' + n"></span>
			</div>
		</div>
	</div>
</template>

<script setup>
// No logic needed, this is a purely visual/decorative component.
// Hidden on small screens via CSS media query below.
</script>

<style scoped>
/*
 * .scene is the positioning context .cube's top/left percentages resolve
 * against. In the original standalone page that context was the whole
 * viewport (via html, body { display: flex; align-items: center;
 * justify-content: center }), which is exactly what would break the rest
 * of this site's layout. Giving .scene its own position: relative box,
 * sized to match the cube, scopes that same centering to just this
 * component instead. flex-shrink: 0 keeps it from being squeezed once it
 * sits next to the h1 in the hero's flex row.
 */
.scene {
	position: relative;
	width: 200px;
	height: 200px;
	flex-shrink: 0;
}

.cube > div {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 0;
	width: 200px;
	height: 200px;
	border: 2px solid white;
	position: absolute;
	opacity: 80%;
}

.cube span {
	border: 2px solid white;
}

.front {
	background-color: #fa5252;
	transform: translate3d(-100px, -100px, 100px);
}

.back {
	background-color: #f76707;
	transform: translate3d(-100px, -100px, -100px);
}

.right {
	background-color: #12b886;
	transform: translate3d(0, -100px, 0) rotateY(90deg);
}

.left {
	background-color: #4c6ef5;
	transform: translate3d(-200px, -100px, 0) rotateY(90deg);
}

.top {
	background-color: #fab005;
	transform: translate3d(-100px, -200px, 0) rotateX(90deg);
}

.bottom {
	background-color: #7950f2;
	transform: translate3d(-100px, 0px, 0) rotateX(90deg);
}

/*
 * left: 50% instead of the original 35%: the source page positioned this
 * at 35% and its rotateY twin at 65% so the pair sat side by side across
 * the whole viewport. With only one cube left, 50% centers it in its own
 * .scene box instead of sitting off-center.
 */
.rotateX .cube {
	position: absolute;
	top: 50%;
	left: 50%;
	transform-style: preserve-3d;
	transform: rotateX(-30deg) rotateY(-45deg) rotateZ(0);
	animation: x-axis 5s linear infinite;
}

@keyframes x-axis {
	0% {
		transform: rotateX(-30deg) rotateY(-45deg) rotateZ(0);
	}

	20% {
		transform: rotateX(-30deg) rotateY(-45deg) rotateZ(0);
	}

	25% {
		transform: rotateX(-30deg) rotateY(-135deg) rotateZ(0);
	}

	45% {
		transform: rotateX(-30deg) rotateY(-135deg) rotateZ(0);
	}

	50% {
		transform: rotateX(-30deg) rotateY(-225deg) rotateZ(0);
	}

	70% {
		transform: rotateX(-30deg) rotateY(-225deg) rotateZ(0);
	}

	75% {
		transform: rotateX(-30deg) rotateY(-315deg) rotateZ(0);
	}

	95% {
		transform: rotateX(-30deg) rotateY(-315deg) rotateZ(0);
	}

	100% {
		transform: rotateX(-30deg) rotateY(-405deg) rotateZ(0);
	}
}

/*
 * WCAG 2.2.2 (Pause, Stop, Hide) requires a way to stop motion that runs
 * longer than five seconds unless it's essential; a decorative spinning
 * cube isn't essential, so reduced-motion users get it frozen at its
 * resting orientation instead of stopped mid-spin. Same override pattern
 * already used for .reveal and the FAQ accordion in HomeSections.vue.
 */
@media (prefers-reduced-motion: reduce) {
	.rotateX .cube {
		animation: none;
	}
}

@media (max-width: 768px) {
	.scene {
		display: none;
	}
}
</style>
