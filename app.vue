<template>
    <div class="wrapper my-20 min-h-[200vh]">

        <Dropdown>
            <template #button>
                <Icon name="tabler:dots" />
            </template>
            <template #dropdown>
                <a class="button button-secondary">Option 1</a>
                <a class="button button-secondary">Option 2</a>
                <a class="button button-danger">Option 3</a>
            </template>
        </Dropdown>

    </div>
</template>