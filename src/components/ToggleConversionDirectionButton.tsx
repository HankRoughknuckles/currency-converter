import styled from "styled-components";
import { useCallback, useState } from "react";

const LargeClickableArrow = styled.div`
  font-size: 3rem;
  cursor: pointer;
`;

enum Direction {
  FromCzk = "FromCzk",
  FromForeignCurrency = "FromForeignCurrency",
}

const FROM_FOREIGN_CURRENCY_ICON = "⬅️";
const FROM_CZK_ICON = "➡️";

export const ToggleConversionDirectionButton = () => {
  const [direction, setDirection] = useState<Direction>(Direction.FromCzk);

  const onClick = useCallback(() => {
    if (direction === Direction.FromCzk) {
      setDirection(Direction.FromForeignCurrency);
    } else {
      setDirection(Direction.FromCzk);
    }
  }, [direction, setDirection]);

  return (
    <LargeClickableArrow onClick={onClick}>
      {direction === Direction.FromCzk
        ? FROM_CZK_ICON
        : FROM_FOREIGN_CURRENCY_ICON}
    </LargeClickableArrow>
  );
};
