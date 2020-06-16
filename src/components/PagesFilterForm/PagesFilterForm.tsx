import React, { useState, useEffect } from 'react';
import './PagesFilterForm.scss';
import {
  PagesFilterFormDispatchToPropsMapResult,
  PagesFilterFormStateToPropsMapResult,
} from './PagesFilterFormConnected';
import { Button, Label, Input, Container } from '../__ui__';
import { ModalButtons } from '../ModalBlocks';

interface PagesFilterFormProps extends PagesFilterFormStateToPropsMapResult, PagesFilterFormDispatchToPropsMapResult {}

const PagesFilterForm: React.FC<PagesFilterFormProps> = ({
  pagesFilter,
  closeModal,
  updatePagesFilter,
}: PagesFilterFormProps) => {
  const { startDate: filterStartDate, endDate: filterEndDate } = pagesFilter;

  const [startDate, setStartDate] = useState(filterStartDate ? filterStartDate : '');
  const [endDate, setEndDate] = useState(filterEndDate ? filterEndDate : '');
  const [areDateRangesValid, setAreDateRangesValid] = useState<boolean>();

  useEffect(() => {
    if (startDate && endDate) {
      setAreDateRangesValid(Date.parse(startDate) <= Date.parse(endDate));
    } else {
      setAreDateRangesValid(true);
    }
  }, [startDate, endDate, setAreDateRangesValid]);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEndDate(event.target.value);
  };

  const handleApplyClick = (): void => {
    closeModal();
    updatePagesFilter({
      ...pagesFilter,
      startDate,
      endDate,
    });
  };

  const handleCancelClick = (): void => {
    closeModal();
  };

  return (
    <Container direction="column">
      <Container direction="column" spaceBetweenChildren="medium">
        <Container direction="column">
          <Label>Start date</Label>
          <Input type="date" value={startDate} onChange={handleStartDateChange}></Input>
        </Container>
        <Container direction="column">
          <Label>End date</Label>
          <Input type="date" value={endDate} onChange={handleEndDateChange}></Input>
        </Container>
      </Container>
      <ModalButtons>
        <Button onClick={handleApplyClick} disabled={!areDateRangesValid}>
          Apply
        </Button>
        <Button onClick={handleCancelClick}>Cancel</Button>
      </ModalButtons>
    </Container>
  );
};

export default PagesFilterForm;
