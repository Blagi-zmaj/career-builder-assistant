import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import HobbiesSection from "../components/CVCreator/HobbiesSection/HobbiesSection";
import { userProfileData } from "../components/CVCreator/CVCreatorUtils/helpers";

const actualUserHobbies = [...userProfileData.hobbies];
const newHobbyNames = ["Wypasanie owiec", "Sci-fi", "Kowalstwo"];
const hobbyToChange = "Nauka";

const createTests = function (
  actualUserAttributes,
  newAttributesNames,
  attributeToChange,
  categoryListName
) {
  const listNameCapitalized = `${categoryListName[0].toUpperCase()}${categoryListName.slice(
    1,
    -1
  )}`;

  describe(`${categoryListName} section`, () => {
    const userAttributes = [...actualUserAttributes];
    const localNewAttributesNames = [...newAttributesNames];

    beforeEach(() => {
      render(
        <HobbiesSection
        //   categoryList={categoryListName}
        //   hideAllButtons={() => {}}
        />
      );
    });

    // it("Renders component with initial values", () => {
    //   // Check did show all attributes (text in span)
    //   userAttributes.forEach((el) => {
    //     const textSpanRecord = screen.getByText(el.name);
    //     expect(textSpanRecord).toBeInTheDocument();

    //     // Check did show all delete buttons for each existing record
    //     const button = screen.getByRole("button", {
    //       name: new RegExp(`${el.name}`, `i`),
    //     });
    //     expect(button).toBeInTheDocument();
    //   });

    //   // Check did show button for add new record
    //   const AddNewRecordButton = screen.getByRole("button", {
    //     name: new RegExp(`addnewhobby`, `i`),
    //   });
    //   expect(AddNewRecordButton).toBeInTheDocument();

    //   // Check did show add new record input appear with empty value
    //   const addNewRecordInput = screen.getByPlaceholderText(
    //     new RegExp(`new hobby`, `i`)
    //   );
    //   expect(addNewRecordInput).toHaveValue("");
    // });

    // it("Simulates starting tooltip state - not show", () => {
    //   const emptyMsgTooltip = screen.queryByText(/empty record/i);
    //   expect(emptyMsgTooltip).not.toBeInTheDocument();
    // });

    // it("Simulates changing existing attribute name", async () => {
    //   const user = userEvent.setup();
    //   const spanRecordText = screen.getByText(attributeToChange);
    //   await user.click(spanRecordText);
    //   const inputRecord = screen.getByDisplayValue(attributeToChange);
    //   await user.clear(inputRecord);
    //   await user.keyboard(newAttributesNames[0]);
    //   await user.tab();
    //   const updatedRecordSpan = screen.getByText(newAttributesNames[0]);
    //   expect(updatedRecordSpan).toBeInTheDocument();
    // });

    it("Simulates changing all existing attribute name (tab to approve changes)", async () => {
      const user = userEvent.setup();

      for (let index = 0; index < userAttributes.length; index++) {
        const el = userAttributes[index];
        const recordNameText = screen.getByText(el.name);
        await user.click(recordNameText);
        const inputRecord = screen.getByDisplayValue(el.name);
        await user.clear(inputRecord);
        console.log(localNewAttributesNames[index]);
        await user.keyboard(localNewAttributesNames[index]);
        await user.tab();
        const updatedRecordSpan = screen.getByText(
          localNewAttributesNames[index]
        );
        expect(updatedRecordSpan).toBeInTheDocument();
      }
    });

    // it("Simulates changing existing attribute name to empty string", async () => {
    //   for (let index = 0; index < userAttributes.length; index++) {
    //     const user = userEvent.setup();
    //     const el = userAttributes[index];
    //     const recordNameText = screen.getByText(el.name);
    //     await user.click(recordNameText);
    //     const recordInput = screen.getByDisplayValue(el.name);
    //     await user.clear(recordInput);

    //     // check did tooltip shows with "empty record" message
    //     const tooltip = screen.getByText(/empty record/i); // <== TO FIX! issue with duplicated empty record message: shown on add new skill button when click one of records
    //     expect(tooltip).toBeInTheDocument();
    //     expect(tooltip).toHaveTextContent(/empty record/i);

    //     // check did in recordNameText show text "ADD OR DELETE!"
    //     await user.tab();
    //     const updatedRecordSpan = screen.getByText(/add or delete/i);
    //     expect(updatedRecordSpan).toHaveTextContent(/add or delete/i);

    //     // write new value for empty element
    //     await user.click(updatedRecordSpan);
    //     await user.clear(screen.getByDisplayValue(/add or delete/i));
    //     await user.keyboard(localNewAttributesNames[index]);
    //     await user.tab();

    //     expect(
    //       screen.getByText(localNewAttributesNames[index])
    //     ).toBeInTheDocument();
    //   }
    // });

    // it("Simulates changing existing record name to duplicated one and writing new value", async () => {
    //   // start from index 1 to check duplicates
    //   for (let index = 1; index < userAttributes.length; index++) {
    //     const user = userEvent.setup();

    //     const el = userAttributes[index];
    //     const recordNameText = screen.getByText(el.name);

    //     await user.click(recordNameText);

    //     const recordInput = screen.getByDisplayValue(el.name);
    //     await user.clear(recordInput);
    //     await user.keyboard(userAttributes[0].name);

    //     // check did tooltip shows with "duplicated record" message
    //     const tooltip = screen.getByText(/duplicated record/i);
    //     expect(tooltip).toBeInTheDocument();
    //     expect(tooltip).toHaveTextContent(/duplicated record/i);

    //     // check did in recordNameText show text "CHANGE OR DELETE!"
    //     await user.tab();
    //     const updatedRecordSpan = screen.getByText(/change or delete/i);
    //     expect(updatedRecordSpan).toHaveTextContent(/change or delete/i);

    //     // write new value for duplicated element
    //     await user.click(updatedRecordSpan);
    //     await user.clear(screen.getByDisplayValue(/change or delete/i));
    //     await user.keyboard(localNewAttributesNames[index]);
    //     await user.tab();

    //     expect(
    //       screen.getByText(localNewAttributesNames[index])
    //     ).toBeInTheDocument();
    //   }
    // });

    // it("Simulates deleting record", async () => {
    //   const user = userEvent.setup();
    //   //Create copy od user attributes
    //   let recordsList = [...userAttributes];

    //   const tempDelElement = attributeToChange;

    //   for (let i = 0; i < recordsList.length; i++) {
    //     let deletedRecordName = recordsList[i].name;

    //     // Find button
    //     const deletebutton = screen.getByRole("button", {
    //       name: deletedRecordName,
    //     });

    //     // Check list of attributes before delete list item
    //     recordsList.forEach((el) => {
    //       expect(screen.getByText(el.name)).toBeInTheDocument();
    //       expect(recordsList).toHaveLength(recordsList.length);
    //     });

    //     // Click on delete button
    //     await user.click(deletebutton);
    //     recordsList = recordsList.filter((el) => {
    //       return el.name !== deletedRecordName;
    //     });

    //     // Check list of attributes after delete list item
    //     recordsList.forEach((el) => {
    //       expect(screen.getByText(el.name)).toBeInTheDocument();
    //     });
    //     expect(recordsList).toHaveLength(recordsList.length);

    //     // Check content of rest elements (confirm that correct element was deleted)
    //     recordsList.forEach((el) => {
    //       if (tempDelElement === el.name) {
    //         throw new Error(`ELEMENT ${deletedRecordName} SHOULD BE DELETED!`);
    //       }
    //     });
    //   }
    // });

    // it("Simulates adding new record", async () => {
    //   const user = userEvent.setup();
    //   let updatedRecordList = [...userAttributes];
    //   const newRecordsList = [
    //     { name: newAttributesNames[0], level: 1, isEditing: false },
    //     { name: newAttributesNames[1], level: 2, isEditing: false },
    //     { name: newAttributesNames[2], level: 4, isEditing: false },
    //   ];

    //   for (let i = 0; i < userAttributes.length; i++) {
    //     let newRecord = newRecordsList[i];

    //     // Check did all attributes are visible
    //     updatedRecordList.forEach((el) => {
    //       expect(screen.getByText(el.name)).toBeInTheDocument();
    //     });

    //     // Find add button with disabled attribute
    //     const addRecordButton = screen.getByRole("button", {
    //       name: new RegExp(`addnew${listNameCapitalized}`, `i`),
    //       disabled: false,
    //     });
    //     expect(addRecordButton).toBeInTheDocument();

    //     // Find input to add new record
    //     const addNewRecordInput = screen.getByPlaceholderText(
    //       new RegExp(`new ${listNameCapitalized}`, `i`)
    //     );

    //     // Click on input
    //     await user.click(addNewRecordInput);

    //     // Type on input new record
    //     await user.keyboard(newRecord.name);

    //     // Click add button
    //     await user.click(addRecordButton);
    //     updatedRecordList.push(newRecord);

    //     // Verify if new record is visible
    //     expect(screen.getByText(newRecord.name)).toBeInTheDocument();
    //   }
    // });

    // it(`Simulates add, delete and modify ${listNameCapitalized}`, async () => {
    //   const user = userEvent.setup();
    //   let updatedRecordList = [...userAttributes];
    //   let newRecord = newAttributesNames[0];
    //   let recordToDelete = attributeToChange;

    //   // Check did all attributes are visible
    //   updatedRecordList.forEach((el) => {
    //     expect(screen.getByText(el.name)).toBeInTheDocument();
    //   });

    //   // Find add button with disabled attribute
    //   const addRecordButton = screen.getByRole("button", {
    //     name: new RegExp(`addnew${listNameCapitalized}`, `i`),
    //     disabled: false,
    //   });
    //   expect(addRecordButton).toBeInTheDocument();

    //   // Find input to add new record
    //   const addNewRecordInput = screen.getByPlaceholderText(
    //     new RegExp(`new ${listNameCapitalized}`, `i`)
    //   );

    //   // Click on input
    //   await user.click(addNewRecordInput);

    //   // Type on input new record
    //   await user.keyboard(newRecord);

    //   // Click add button
    //   await user.click(addRecordButton);
    //   updatedRecordList.push(newRecord);

    //   // Verify if new record is visible
    //   expect(screen.getByText(newRecord)).toBeInTheDocument();

    //   // Delete first record - <attributeToChange>
    //   //// Find delete button with name <attributeToChange>
    //   const deleteBtn = screen.getByRole("button", { name: recordToDelete });

    //   //// Click delete btn
    //   await user.click(deleteBtn);

    //   //// Check did deleted element is visible
    //   const deletedRecord = screen.queryByText(recordToDelete);
    //   expect(deletedRecord).not.toBeInTheDocument();

    //   // Find and modify newly added record name to existing one
    //   const newRecordTextElement = screen.getByText(newRecord);
    //   await user.click(newRecordTextElement);

    //   const updatedInput = screen.getByDisplayValue(newRecord);
    //   await user.click(updatedInput);
    //   await user.clear(updatedInput);
    //   await user.keyboard(actualUserAttributes[1].name);

    //   // Check did show tooltip with "duplicated record message"
    //   const tooltip = screen.getByText(/duplicated record/i);
    //   await user.tab();
    // });
  });
};

createTests(actualUserHobbies, newHobbyNames, hobbyToChange, "hobbies");
