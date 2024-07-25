import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UserDetailsList from "../components/CVCreator/UserDetailsList";
import { userProfileData } from "../components/CVCreator/CVCreatorUtils/helpers";

// describe("SkillsSection", () => {
//   const newSkillNames = ["Machine learning", "React PRO", "Deep learning"];
//   const userSkills = [...userProfileData.skills];

//   beforeEach(() => {
//     render(<UserDetailsList categoryList="skills" hideAllButtons={() => {}} />);
//   });

//   it("Renders component with initial values", () => {
//     // Check did show all skills (text in span)
//     userSkills.forEach((el, index) => {
//       const textSpanSkill = screen.getByText(el.name);
//       expect(textSpanSkill).toBeInTheDocument();

//       // Check did show all delete buttons for each existing skill
//       const button = screen.getByRole("button", {
//         name: new RegExp(`${el.name}`, `i`),
//       });
//       expect(button).toBeInTheDocument();
//     });

//     // Check did show button for add new skill
//     const AddNewSkillButton = screen.getByRole("button", {
//       name: /AddNewSkill/i,
//     });
//     expect(AddNewSkillButton).toBeInTheDocument();

//     // Check did show add new skill input appear with empty value
//     const addNewSkillInput = screen.getByPlaceholderText(/new skill/i);
//     expect(addNewSkillInput).toHaveValue("");
//   });

//   it("Simulates starting tooltip state - not show", () => {
//     const emptyMsgTooltip = screen.queryByText(/empty record/i);
//     expect(emptyMsgTooltip).not.toBeInTheDocument();
//   });

//   it("Simulates changing existing skill name", async () => {
//     const user = userEvent.setup();

//     const spanSkillText = screen.getByText("Machine");

//     await user.click(spanSkillText);

//     const inputSkill = screen.getByDisplayValue("Machine");

//     await user.clear(inputSkill);
//     await user.keyboard("Machine Learning");
//     await user.tab();
//     const updatedSkillSpan = screen.getByText("Machine Learning");

//     expect(updatedSkillSpan).toBeInTheDocument();
//   });

//   it("Simulates changing all existing skill name (tab to approve changes)", async () => {
//     const user = userEvent.setup();

//     for (let index = 0; index < userSkills.length; index++) {
//       const el = userSkills[index];
//       const skillNameText = screen.getByText(el.name);

//       await user.click(skillNameText);

//       const inputSkill = screen.getByDisplayValue(el.name);
//       await user.clear(inputSkill);
//       await user.keyboard(newSkillNames[index]);
//       await user.tab();

//       const updatedSkillSpan = screen.getByText(newSkillNames[index]);

//       expect(updatedSkillSpan).toBeInTheDocument();
//     }
//   });

//   it("Simulates changing existing skill name to empty string", async () => {
//     for (let index = 0; index < userSkills.length; index++) {
//       const user = userEvent.setup();

//       const el = userSkills[index];
//       const skillNameText = screen.getByText(el.name);

//       await user.click(skillNameText);

//       const skillInput = screen.getByDisplayValue(el.name);
//       await user.clear(skillInput);

//       // check did tooltip shows with "empty record" message
//       const tooltip = screen.getByText(/empty record/i);
//       expect(tooltip).toBeInTheDocument();
//       expect(tooltip).toHaveTextContent(/empty record/i);

//       // check did in skillNameText show text "ADD OR DELETE!"
//       await user.tab();
//       const updatedSkillSpan = screen.getByText(/add or delete/i);
//       expect(updatedSkillSpan).toHaveTextContent(/add or delete/i);

//       // write new value for empty element
//       await user.click(updatedSkillSpan);
//       await user.clear(screen.getByDisplayValue(/add or delete/i));
//       await user.keyboard(newSkillNames[index]);
//       await user.tab();

//       expect(screen.getByText(newSkillNames[index])).toBeInTheDocument();
//     }
//   });

//   it("Simulates changing existing skill name to duplicated one and writing new value", async () => {
//     // start from index 1 to check duplicates
//     for (let index = 1; index < userSkills.length; index++) {
//       const user = userEvent.setup();

//       const el = userSkills[index];
//       const skillNameText = screen.getByText(el.name);

//       await user.click(skillNameText);

//       const skillInput = screen.getByDisplayValue(el.name);
//       await user.clear(skillInput);
//       await user.keyboard(userSkills[0].name);

//       // check did tooltip shows with "duplicated record" message
//       const tooltip = screen.getByText(/duplicated record/i);
//       expect(tooltip).toBeInTheDocument();
//       expect(tooltip).toHaveTextContent(/duplicated record/i);

//       // check did in skillNameText show text "CHANGE OR DELETE!"
//       await user.tab();
//       const updatedSkillSpan = screen.getByText(/change or delete/i);
//       expect(updatedSkillSpan).toHaveTextContent(/change or delete/i);

//       // write new value for duplicated element
//       await user.click(updatedSkillSpan);
//       await user.clear(screen.getByDisplayValue(/change or delete/i));
//       await user.keyboard(newSkillNames[index]);
//       await user.tab();

//       expect(screen.getByText(newSkillNames[index])).toBeInTheDocument();
//     }
//   });

//   it("Simulates deleting record", async () => {
//     const user = userEvent.setup();
//     //Create copy od userSkills
//     let skillList = [...userSkills];

//     const tempDelElement = "Machine";

//     for (let i = 0; i < skillList.length; i++) {
//       let deletedSkillName = skillList[i].name;

//       // Find button
//       const deletebutton = screen.getByRole("button", {
//         name: deletedSkillName,
//       });

//       // Check list of skills before delete list item
//       skillList.forEach((el) => {
//         expect(screen.getByText(el.name)).toBeInTheDocument();
//         expect(skillList).toHaveLength(skillList.length);
//       });

//       // Click on delete button
//       await user.click(deletebutton);
//       skillList = skillList.filter((el) => {
//         return el.name !== deletedSkillName;
//       });

//       // Check list of skills after delete list item
//       skillList.forEach((el) => {
//         expect(screen.getByText(el.name)).toBeInTheDocument();
//       });
//       expect(skillList).toHaveLength(skillList.length);

//       // Check content of rest elements (confirm that correct element was deleted)
//       skillList.forEach((el) => {
//         if (tempDelElement === el.name) {
//           throw new Error(`ELEMENT ${deletedSkillName} SHOULD BE DELETED!`);
//         }
//       });
//     }
//   });

//   it("Simulates adding new record", async () => {
//     const user = userEvent.setup();
//     let updatedSkillList = [...userSkills];
//     const newSkillsList = [
//       { name: "Machine learning", level: 1, isEditing: false },
//       { name: "Deep learning", level: 2, isEditing: false },
//       { name: "Data Science", level: 4, isEditing: false },
//     ];

//     for (let i = 0; i < userSkills.length; i++) {
//       let newSkill = newSkillsList[i];

//       // Check did all skills are visible
//       updatedSkillList.forEach((el) => {
//         expect(screen.getByText(el.name)).toBeInTheDocument();
//       });

//       // Find add button with disabled attribute
//       const addSkillButton = screen.getByRole("button", {
//         name: new RegExp(`addnewskill`, `i`),
//         disabled: false,
//       });
//       expect(addSkillButton).toBeInTheDocument();

//       // Find input to add new record
//       const addNewSkillInput = screen.getByPlaceholderText(/new skill/i);

//       // Click on input
//       await user.click(addNewSkillInput);

//       // Type on input new skill
//       await user.keyboard(newSkill.name);

//       // Click add button
//       await user.click(addSkillButton);
//       updatedSkillList.push(newSkill);

//       // Verify if new skill is visible
//       expect(screen.getByText(newSkill.name)).toBeInTheDocument();
//     }
//   });

//   it("Simulates add, delete and modify skill", async () => {
//     const user = userEvent.setup();
//     let updatedSkillList = [...userSkills];
//     let newSkill = "Software Architecture";
//     let skillToDelete = "Machine";

//     // Check did all skills are visible
//     updatedSkillList.forEach((el) => {
//       expect(screen.getByText(el.name)).toBeInTheDocument();
//     });

//     // Find add button with disabled attribute
//     const addSkillButton = screen.getByRole("button", {
//       name: new RegExp(`addnewskill`, `i`),
//       disabled: false,
//     });
//     expect(addSkillButton).toBeInTheDocument();

//     // Find input to add new record
//     const addNewSkillInput = screen.getByPlaceholderText(/new skill/i);

//     // Click on input
//     await user.click(addNewSkillInput);

//     // Type on input new skill
//     await user.keyboard(newSkill);

//     // Click add button
//     await user.click(addSkillButton);
//     updatedSkillList.push(newSkill);

//     // Verify if new skill is visible
//     expect(screen.getByText(newSkill)).toBeInTheDocument();

//     // Delete first skill - "Machine"
//     //// Find delete button with name "Machine"
//     const deleteBtn = screen.getByRole("button", { name: skillToDelete });

//     //// Click delete btn
//     await user.click(deleteBtn);

//     //// Check did deleted element is visible
//     const deletedSkill = screen.queryByText(skillToDelete);
//     expect(deletedSkill).not.toBeInTheDocument();

//     // Find and modify newly added skill name to existing one
//     const newSkillTextElement = screen.getByText(newSkill);
//     await user.click(newSkillTextElement);

//     const updatedInput = screen.getByDisplayValue(newSkill);
//     await user.click(updatedInput);
//     await user.clear(updatedInput);
//     await user.keyboard("Deep");

//     // Check did show tooltip with "duplicated record message"
//     const tooltip = screen.getByText(/duplicated record/i);
//     await user.tab();
//   });
// });

const newSkillNames = ["Machine learning", "React PRO", "Deep learning"];
const userSkills = [...userProfileData.skills];

const skillToClick = "Machine";
const newSkill = "Machine learning";

const createTest = function () {
  describe("", () => {
    beforeEach(() => {
      render(
        <UserDetailsList categoryList="skills" hideAllButtons={() => {}} />
      );
    });
    it("Simulates changing existing skill name", async () => {
      const user = userEvent.setup();

      const spanSkillText = screen.getByText("Machine");

      await user.click(spanSkillText);

      const inputSkill = screen.getByDisplayValue("Machine");

      await user.clear(inputSkill);
      await user.keyboard("Machine Learning");
      await user.tab();
      const updatedSkillSpan = screen.getByText("Machine Learning");

      expect(updatedSkillSpan).toBeInTheDocument();
    });
  });
};

createTest();
