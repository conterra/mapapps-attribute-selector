<!--

    Copyright (C) 2025 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <div class="attributeSelectorWidget--container">
        <div v-if="mode == 'radio'">
            <v-radio-group
                v-model="radios"
                inline
            >
                <v-radio
                    label="Alle"
                    aria-label="alle"
                    value="attributeselector_all"
                />
                <v-flex
                    v-for="(field, index) in attributeValues"
                    :key="index"
                >
                    <v-radio
                        :label="field"
                        :aria-label="field"
                        :value="field"
                    />
                </v-flex>
            </v-radio-group>
        </div>
        <div v-if="mode == 'button'">
            <v-btn-toggle v-model="buttons">
                <v-flex
                    v-for="(field, index) in attributeValues"
                    :key="index"
                >
                    <v-btn :value="field">
                        {{ field }}
                    </v-btn>
                </v-flex>
            </v-btn-toggle>
        </div>
        <div
            v-if="mode == 'checkbox'"
            class="flex flex-wrap gap-4"
        >
            <v-flex
                v-for="(field, index) in attributeValues"
                :key="index"
            >
                <v-checkbox
                    v-model="checkboxes"
                    :value="field"
                    :label="field"
                />
            </v-flex>
        </div>
    </div>
</template>

<script lang="ts">
    import Bindable from "apprt-vue/mixins/Bindable";
    import { defineComponent } from 'vue';

    export default defineComponent({
        mixins: [Bindable],
        props: {
            i18n: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                radios: '',
                buttons: '',
                attributeValues: [],
                mode: '',
                checkboxes: ''
            };
        }
    });
</script>
