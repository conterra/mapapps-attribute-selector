///
/// Copyright (C) 2025 con terra GmbH (info@conterra.de)
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///         http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import AttributeSelectorWidget from "./template/AttributeSelectorWidget.ts.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding, { Bindable } from "apprt-binding/Binding";

import type { InjectedReference } from "apprt-core/InjectedReference";
import type { MessagesReference } from "./nls/bundle";
import type { AttributeSelectorWidgetModel } from "./AttributeSelectorWidgetModel";
import type { AttributeSelectorController } from "./AttributeSelectorController";
import type Tool from "ct/tools/Tool";

export class AttributeSelectorWidgetFactory {
    private vm?: Vue;
    private toolActiveWatcher?: __esri.WatchHandle;
    private attributeSelectorModelBinding?: Bindable;

    private _i18n!: InjectedReference<MessagesReference>;
    private _model: InjectedReference<AttributeSelectorWidgetModel>;
    private _controller: InjectedReference<AttributeSelectorController>;
    private _attributeSelectorWidgetToggleTool: InjectedReference<Tool>;

    activate(): void {
        this.initComponent();
    }

    deactivate(): void {
        this.attributeSelectorModelBinding?.unbind();
        this.attributeSelectorModelBinding = undefined;

        this.vm = undefined;
    }

    initComponent(): void {
        const model = this._model!;
        const controller = this._controller!;

        const vm: Vue = this.vm = new Vue(AttributeSelectorWidget);
        vm.i18n = this._i18n!.get().ui;
        vm.mode = model.mode;

        model.watch("radios", (newValue: any) => {
            controller.removeSelectorDefinitionExpressionFromLayers();
            if(newValue && newValue.value && newValue.value != "attributeselector_all"){
                controller.addSelectorDefinitionExpressionToLayers(newValue);
            }
        });

        model.watch("buttons", (newValue: any) => {
            controller.removeSelectorDefinitionExpressionFromLayers();
            if(newValue.value){
                controller.addSelectorDefinitionExpressionToLayers(newValue);
            }
        });

        model.watch("checkboxes", (newValue: any) => {
            controller.removeSelectorDefinitionExpressionFromLayers();
            if(newValue.value){
                controller.addSelectorDefinitionExpressionToLayers(newValue);
            }
        });
        this.attributeSelectorModelBinding = Binding.for(vm, model)
            .syncAll("attributeValues", "radios", "buttons", "checkboxes")
            .enable()
            .syncToLeftNow();

        this.createToolActiveWatcher();
    }

    createInstance(): typeof VueDijit {
        return VueDijit(this.vm);
    }

    private createToolActiveWatcher(): void {
        const tool = this._attributeSelectorWidgetToggleTool!;

        this.toolActiveWatcher = tool.watch("active", (name, oldValue, newValue) => {
            const model = this._model!;
            const controller = this._controller;

            if (newValue && model.applyDefinitionExpressionOnWidgetOpen && controller) {
                const value = model.mode == "button" ? model.buttons : (model.mode == "radio" ? model.radios : model.checkboxes);
                if(value && value != "" && value != "attributeselector_all"){
                    controller.addSelectorDefinitionExpressionToLayers({value: value});
                }
            }
            else if (!newValue && model.removeDefinitionExpressionOnWidgetClose && controller) {
                controller.removeSelectorDefinitionExpressionFromLayers();
            }
        });
    }

}
