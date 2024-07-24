import UserContactDataSection from "../components/CVCreator/UserContactSection/UserContactDataSection";
import { render, within, screen, fireEvent } from "@testing-library/react";
import { userContactData } from "../components/CVCreator/CVCreatorUtils/helpers";
import "@testing-library/jest-dom";

describe("UserContactDataSection", () => {
  const newValues = [
    "Marta",
    "Koniecznik",
    "Kraków",
    "daniel@daniel.pl",
    "555-555-555",
    "blagi-blagi@github.com",
    "daniel.koniecznik.linkedin.com",
  ];

  beforeEach(() => {
    render(<UserContactDataSection />);
  });

  it("Renders component with initial values", () => {
    Object.entries(userContactData).map((el) => {
      const dataSection = screen.getByText(
        el[0].slice(0, 1).toUpperCase() + el[0].slice(1)
      );
      expect(dataSection).toBeInTheDocument();
    });
  });

  Object.entries(userContactData).map((el) => {
    it("Renders component with initial values - labels and inputs", () => {
      const dataSectionLabel = screen.getByText(
        el[0].slice(0, 1).toUpperCase() + el[0].slice(1)
      );
      expect(dataSectionLabel).toBeInTheDocument();
      const dataSectionInputValue = screen.getByText(el[1]);
      expect(dataSectionInputValue).toBeInTheDocument();
    });
  });

  it("Simulates clicking on text to show input", () => {
    Object.entries(userContactData).map((el, index) => {
      const spanDataSectionValue = screen.getByText(el[1]);
      fireEvent.click(spanDataSectionValue);
      const inputDataSection = screen.getByDisplayValue(el[1]);
    });
  });

  it("Simulates span click, input change and state update with pressing Enter", () => {
    Object.entries(userContactData).map((el, index) => {
      const spanDataSectionValue = screen.getByText(el[1]);
      fireEvent.click(spanDataSectionValue);

      const inputDataSection = screen.getByDisplayValue(el[1]);
      fireEvent.change(inputDataSection, {
        target: { value: newValues[index] },
      });
      expect(inputDataSection.value).toBe(newValues[index]);

      fireEvent.keyDown(inputDataSection, { key: "Enter", code: "Enter" });
      const updatedSpanDataSectionValue = screen.getByText(newValues[index]);
      expect(updatedSpanDataSectionValue.textContent).toBe(newValues[index]);
    });
  });

  it("Simulates blur event and state update", () => {
    Object.entries(userContactData).map((el, index) => {
      const spanDataSectionValue = screen.getByText(el[1]);
      fireEvent.click(spanDataSectionValue);

      const inputDataSection = screen.getByDisplayValue(el[1]);
      fireEvent.change(inputDataSection, {
        target: { value: newValues[index] },
      });

      expect(inputDataSection.value).toBe(newValues[index]);
      fireEvent.blur(inputDataSection);

      const updatedSpanDataSectionValue = screen.getByText(newValues[index]);
      expect(updatedSpanDataSectionValue.textContent).toBe(newValues[index]);
    });
  });

  it("Simulates empty input and tooltip visibility", () => {
    Object.entries(userContactData).map((el, index) => {
      const spanDataSectionValue = screen.getByText(el[1]);
      fireEvent.click(spanDataSectionValue);

      const inputDataSection = screen.getByDisplayValue(el[1]);
      fireEvent.change(inputDataSection, { target: { value: "" } });

      // find tooltip with message "empty record"
      const tooltip = screen.getByText(new RegExp(`empty record`, `i`));

      // click enter and check if show text "add <property>""
      fireEvent.keyDown(inputDataSection, { key: "Enter", code: "Enter" });
      const updatedSpanDataSectionValue = screen.getByText(
        new RegExp(`add ${el[0]}`, `i`)
      );
    });
  });
});
