import React from 'react';
import './MealsListItem.scss';
import { MealType, availableMeals } from '../../models';
import { MealsListItemStateToPropsMapResult, MealsListItemDispatchToPropsMapResult } from './MealsListItemConnected';
import NoteInputConnected from '../NoteInput';
import NotesTableConnected from '../NotesTable';
import { Container, Badge, Icon, Preloader } from '../__ui__';

interface MealsListItemProps extends MealsListItemStateToPropsMapResult, MealsListItemDispatchToPropsMapResult {
  mealType: MealType;
}

const MealsListItem: React.FC<MealsListItemProps> = ({
  mealType,
  collapsedMeals,
  notesForMealFetchStates,
  noteItems,
  setCollapsedForMeal,
}: MealsListItemProps) => {
  const isCollapsed = collapsedMeals.includes(mealType);

  const currentMealFetchState = notesForMealFetchStates.find(s => s.mealType === mealType);

  const isNotesTableLoading = currentMealFetchState && currentMealFetchState.loading;
  const notesTableLoadingMessage = currentMealFetchState && currentMealFetchState.loadingMessage;

  const mealName = availableMeals.has(mealType) ? availableMeals.get(mealType) : 'Unknown meal';
  const mealNotes = noteItems.filter(n => n.mealType === mealType);

  const countNotes = mealNotes.length;
  const countCalories = mealNotes.reduce((sum, note) => sum + note.calories, 0);

  const handleItemHeaderClick = (): void => {
    setCollapsedForMeal(!isCollapsed, mealType);
  };

  const mealsListItemContentClassNames = ['meals-list-item__content'];

  if (isCollapsed) {
    mealsListItemContentClassNames.push('meals-list-item__content_collapsed');
  }

  return (
    <div className="meals-list-item">
      <div className="meals-list-item__header" onClick={handleItemHeaderClick}>
        <Icon
          type="right-arrow"
          size="small"
          svgStyle={
            isCollapsed
              ? {}
              : {
                  transform: 'rotate(90deg)',
                }
          }
        ></Icon>
        <div className="meals-list-item__header__name">{mealName}</div>
        <Container spaceBetweenChildren="small">
          <Badge label={`${countNotes} ${countNotes === 1 ? 'note' : 'notes'}`}></Badge>
          <Badge label={`${countCalories} cal`}></Badge>
        </Container>
      </div>
      <Container
        direction="column"
        spaceBetweenChildren="medium"
        additionalCssClassNames={mealsListItemContentClassNames}
      >
        <NoteInputConnected mealType={mealType}></NoteInputConnected>
        <Preloader isVisible={isNotesTableLoading} label={notesTableLoadingMessage}>
          <NotesTableConnected mealType={mealType}></NotesTableConnected>
        </Preloader>
      </Container>
    </div>
  );
};

export default MealsListItem;
