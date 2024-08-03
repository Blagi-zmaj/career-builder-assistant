import SelectAllTransferList from "./TransferList";
import {
  AppWrapper,
  SkillBlockWrapper,
  SkillsListWrapper,
} from "./Styled/JobOfferScraping";
import ChipsArray from "../ChipsArray";
import { ChipData } from "@/app/util/types";

export default function JobOfferScraping() {
  const mockData: readonly ChipData[] = [
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ];

  return (
    <AppWrapper>
      <h1>Check how your CV match offer you are interested in!</h1>
      <SkillBlockWrapper>
        <SkillsListWrapper>
          <h1>Wymagane</h1>
          <ChipsArray data={mockData} />
        </SkillsListWrapper>
        <SkillsListWrapper>
          <h1>Zgodne</h1>
          <ChipsArray data={mockData} />
        </SkillsListWrapper>
        <SelectAllTransferList />
      </SkillBlockWrapper>
      <input
        type="url"
        name="url"
        id="url"
        placeholder="https://example.com"
        pattern="https://.*"
        required
      />
    </AppWrapper>
  );
}
