// UserContactDataSection.test.js

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserContactDataSection from "../components/CVCreator/UserContactSection/UserContactDataSection";
import "@testing-library/jest-dom"; // For matchers like toBeInTheDocument

export const userContactData = {
  name: "John",
  surname: "Doe",
  address: "123 Main St",
  email: "john.doe@example.com",
  phone: "1234567890",
  github: "johndoe",
  linkedin: "linkedin.com/johndoe",
};

// Mock fetch globally
global.fetch = jest.fn();

describe("UserContactDataSection Component", () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear any previous calls to fetch before each test
  });

  test("renders fetched data correctly", async () => {
    // Mock fetch to return the desired response
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true, // Make sure fetch resolves successfully
        json: () => Promise.resolve(userContactData),
      })
    );

    render(<UserContactDataSection />);

    // Wait for the data to be rendered
    await waitFor(() => {
      // Verify that each piece of data is rendered correctly
      Object.entries(userContactData).map((el) => {
        const dataSection = screen.getByText(
          el[0].slice(0, 1).toUpperCase() + el[0].slice(1)
        );
        expect(dataSection).toBeInTheDocument();
      });
    });
  });

  Object.entries(userContactData).map((el) => {
    it("Renders component with initial values - labels and inputs", async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true, // Make sure fetch resolves successfully
          json: () => Promise.resolve(userContactData),
        })
      );

      render(<UserContactDataSection />);

      // Wait for the data to be rendered
      await waitFor(() => {
        // Verify that each piece of data is rendered correctly
        Object.entries(userContactData).map((el) => {
          const dataSection = screen.getByText(
            el[0].slice(0, 1).toUpperCase() + el[0].slice(1)
          );
          expect(dataSection).toBeInTheDocument();
        });
      });

      const dataSectionLabel = screen.getByText(
        el[0].slice(0, 1).toUpperCase() + el[0].slice(1)
      );
      expect(dataSectionLabel).toBeInTheDocument();
      const dataSectionInputValue = screen.getByText(el[1]);
      expect(dataSectionInputValue).toBeInTheDocument();
    });
  });

  it("Simulates clicking on text to show input", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true, // Make sure fetch resolves successfully
        json: () => Promise.resolve(userContactData),
      })
    );

    render(<UserContactDataSection />);

    await waitFor(() => {
      Object.entries(userContactData).map((el, index) => {
        const spanDataSectionValue = screen.getByText(el[1]);
        fireEvent.click(spanDataSectionValue);
        const inputDataSection = screen.getByDisplayValue(el[1]);
      });
    });
  });

  it("Simulates span click, input change and state update with pressing Enter", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true, // Make sure fetch resolves successfully
        json: () => Promise.resolve(userContactData),
      })
    );

    render(<UserContactDataSection />);

    await waitFor(() => {
      Object.entries(userContactData).map((el, index) => {
        const spanDataSectionValue = screen.getByText(el[1]);
        fireEvent.click(spanDataSectionValue);
        const inputDataSection = screen.getByDisplayValue(el[1]);
        fireEvent.change(inputDataSection, {
          target: { value: userContactData[el[0]] },
        });
        expect(inputDataSection.value).toBe(userContactData[el[0]]);
        fireEvent.keyDown(inputDataSection, { key: "Enter", code: "Enter" });
        const updatedSpanDataSectionValue = screen.getByText(
          userContactData[el[0]]
        );
        expect(updatedSpanDataSectionValue.textContent).toBe(
          userContactData[el[0]]
        );
      });
    });
  });

  it("Simulates blur event and state update", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(userContactData),
      })
    );

    render(<UserContactDataSection />);

    await waitFor(() => {
      Object.entries(userContactData).map((el, index) => {
        const spanDataSectionValue = screen.getByText(el[1]);
        fireEvent.click(spanDataSectionValue);
        const inputDataSection = screen.getByDisplayValue(el[1]);
        fireEvent.change(inputDataSection, {
          target: { value: userContactData[el[0]] },
        });
        expect(inputDataSection.value).toBe(userContactData[el[0]]);
        fireEvent.blur(inputDataSection);
        const updatedSpanDataSectionValue = screen.getByText(
          userContactData[el[0]]
        );
        expect(updatedSpanDataSectionValue.textContent).toBe(
          userContactData[el[0]]
        );
      });
    });
  });

  it("Simulates empty input and tooltip visibility", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(userContactData),
      })
    );

    render(<UserContactDataSection />);

    await waitFor(() => {
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
});
