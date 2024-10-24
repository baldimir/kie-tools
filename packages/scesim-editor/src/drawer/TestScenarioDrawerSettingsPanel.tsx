/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import * as React from "react";
import { useCallback } from "react";

import { Checkbox } from "@patternfly/react-core/dist/esm/components/Checkbox";
import { FormSelect, FormSelectOption } from "@patternfly/react-core/dist/esm/components/FormSelect";
import { HelpIcon } from "@patternfly/react-icons/dist/esm/icons/help-icon";
import { Icon } from "@patternfly/react-core/dist/esm/components/Icon/Icon";
import { TextInput } from "@patternfly/react-core/dist/js/components/TextInput";
import { Title } from "@patternfly/react-core/dist/js/components/Title";
import { Tooltip } from "@patternfly/react-core/dist/esm/components/Tooltip";

import { SceSim__settingsType } from "@kie-tools/scesim-marshaller/dist/schemas/scesim-1_8/ts-gen/types";

import { useTestScenarioEditorI18n } from "../i18n";
import { useTestScenarioEditorStore, useTestScenarioEditorStoreApi } from "../store/TestScenarioStoreContext";

import "./TestScenarioDrawerSettingsPanel.css";

function TestScenarioDrawerSettingsPanel({ fileName }: { fileName: string }) {
  const { i18n } = useTestScenarioEditorI18n();
  const settingsModel = useTestScenarioEditorStore((state) => state.scesim.model.ScenarioSimulationModel.settings);
  const testScenarioEditorStoreApi = useTestScenarioEditorStoreApi();
  const testScenarioType = settingsModel.type?.__$$text.toUpperCase();

  const updateSettingsField = useCallback(
    (fieldName: keyof SceSim__settingsType, value: string | boolean) =>
      testScenarioEditorStoreApi.setState((state) => {
        (state.scesim.model.ScenarioSimulationModel.settings[fieldName] as { __$$text: string | boolean }) = {
          __$$text: value,
        };
      }),
    [testScenarioEditorStoreApi]
  );

  return (
    <>
      <Title className={"kie-scesim-editor-drawer-settings--title"} headingLevel={"h6"}>
        {i18n.drawer.settings.fileName}
      </Title>
      <TextInput className={"kie-scesim-editor-drawer-settings--text-input"} value={fileName} type="text" isDisabled />
      <Title className={"kie-scesim-editor-drawer-settings--title"} headingLevel={"h6"}>
        {i18n.drawer.settings.assetType}
      </Title>
      <TextInput
        className={"kie-scesim-editor-drawer-settings--text-input"}
        value={testScenarioType}
        type="text"
        isDisabled
      />
      {testScenarioType === "DMN" ? (
        <>
          <Title className={"kie-scesim-editor-drawer-settings--title"} headingLevel={"h6"}>
            {i18n.drawer.settings.dmnModel}
          </Title>
          {/* Temporary Mocked */}
          <FormSelect
            className={"kie-scesim-editor-drawer-settings--form-select"}
            value={"1"}
            aria-label="FormSelect Input"
            ouiaId="BasicFormSelect"
          >
            <FormSelectOption isDisabled={true} key={0} value={"1"} label={"MockedDMN.dmn"} />
            <FormSelectOption isDisabled={true} key={1} value={"2"} label={"MockedDMN2.dmn"} />
          </FormSelect>
          <Title className={"kie-scesim-editor-drawer-settings--title"} headingLevel={"h6"}>
            {i18n.drawer.settings.dmnName}
          </Title>
          <TextInput
            className={"kie-scesim-editor-drawer-settings--text-input"}
            value={settingsModel.dmnName?.__$$text}
            type="text"
            isDisabled
          />
          <Title className={"kie-scesim-editor-drawer-settings--title"} headingLevel={"h6"}>
            {i18n.drawer.settings.dmnNameSpace}
          </Title>
          <TextInput
            className={"kie-scesim-editor-drawer-settings--text-input"}
            value={settingsModel.dmnNamespace?.__$$text}
            type="text"
            isDisabled
          />
        </>
      ) : (
        <>
          <Title className={"kie-scesim-editor-drawer-settings--title"} headingLevel={"h6"}>
            {i18n.drawer.settings.kieSessionRule}
            <Tooltip content={i18n.drawer.settings.kieSessionRuleTooltip}>
              <Icon className={"kie-scesim-editor-drawer-settings--info-icon"} size="sm" status="info">
                <HelpIcon />
              </Icon>
            </Tooltip>
          </Title>
          <TextInput
            className={"kie-scesim-editor-drawer-settings--text-input"}
            onChange={(value) => updateSettingsField("dmoSession", value)}
            placeholder={i18n.drawer.settings.kieSessionRulePlaceholder}
            type="text"
            value={settingsModel.dmoSession?.__$$text}
          />
          <Title className={"kie-scesim-editor-drawer-settings--title"} headingLevel={"h6"}>
            {i18n.drawer.settings.ruleFlowGroup}
            <Tooltip content={i18n.drawer.settings.ruleFlowGroupTooltip}>
              <Icon className={"kie-scesim-editor-drawer-settings--info-icon"} size="sm" status="info">
                <HelpIcon />
              </Icon>
            </Tooltip>
          </Title>
          <TextInput
            className={"kie-scesim-editor-drawer-settings--text-input"}
            onChange={(value) => updateSettingsField("ruleFlowGroup", value)}
            placeholder={i18n.drawer.settings.ruleFlowGroupPlaceholder}
            type="text"
            value={settingsModel.ruleFlowGroup?.__$$text}
          />
          <div className={"kie-scesim-editor-drawer-settings--checkbox-group"}>
            <div className={"kie-scesim-editor-drawer-settings--checkbox"}>
              <Checkbox
                id="stateless-session"
                isChecked={settingsModel.stateless?.__$$text ?? false}
                label={i18n.drawer.settings.statelessSessionRule}
                onChange={(value) => updateSettingsField("stateless", value)}
              />
            </div>
            <Tooltip content={i18n.drawer.settings.statelessSessionRuleTooltip}>
              <Icon className={"kie-scesim-editor-drawer-settings--info-icon"} size="sm" status="info">
                <HelpIcon />
              </Icon>
            </Tooltip>
          </div>
        </>
      )}
      <div className={"kie-scesim-editor-drawer-settings--checkbox-group"}>
        <div className={"kie-scesim-editor-drawer-settings--checkbox"}>
          <Checkbox
            id="skip-test"
            isChecked={settingsModel.skipFromBuild?.__$$text ?? false}
            label={i18n.drawer.settings.testSkipped}
            onChange={(value) => updateSettingsField("skipFromBuild", value)}
          />
        </div>
        <Tooltip content={i18n.drawer.settings.testSkippedTooltip}>
          <Icon className={"kie-scesim-editor-drawer-settings--info-icon"} size="sm" status="info">
            <HelpIcon />
          </Icon>
        </Tooltip>
      </div>
    </>
  );
}

export default TestScenarioDrawerSettingsPanel;
