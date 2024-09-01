<template>
    <NavigationBar />
    <div class="wrapper mt-14">
        <div class="alert alert-secondary mb-4">
            <div class="alert-body">
                <Icon name="tabler:info-square-rounded" />
                <b>Info Alert</b>
                Dit product bevindt zich nog in de bètaversie en kan bugs bevatten. Als je een bug tegenkomt, meld dit dan bij de CSC-Gilde.​
            </div>
        </div>
        
        <slot />
    </div>
    <Copyright />
</template>