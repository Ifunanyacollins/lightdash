import { Button, Spinner } from '@blueprintjs/core';
import { MenuItem2 } from '@blueprintjs/popover2';
import { ItemRenderer, Suggest2 } from '@blueprintjs/select';
import React, { FC, useCallback } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import HighlightedText from '../common/HighlightedText';
import { Hightlighed } from '../NavBar/GlobalSearch/globalSearch.styles';
import InputWrapper, { InputWrapperProps } from './InputWrapper';

type Item = {
    value: unknown;
    label: string;
    disabled?: boolean;
    title?: string;
    subLabel?: JSX.Element;
};

function isItemMatch(value: Item, other: Item): boolean {
    return value.value === other.value;
}

function itemPredicate(
    query: string,
    item: Item,
    index?: undefined | number,
    exactMatch?: undefined | false | true,
) {
    const label = item.label;
    if (exactMatch) {
        return query.toLowerCase() === label.toLowerCase();
    }
    return label.toLowerCase().includes(query.toLowerCase());
}

const renderItem: ItemRenderer<Item> = (
    item,
    { modifiers, handleClick, query },
) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    const valueId = `${item.value}`;
    const label = item.label;
    const disabled = item.disabled;
    const title = item.title;

    const text = item.subLabel ? (
        <>
            <HighlightedText
                text={label}
                query={query}
                highlightElement={Hightlighed}
            />
            <br />
            {item.subLabel}
        </>
    ) : (
        <HighlightedText
            text={label}
            query={query}
            highlightElement={Hightlighed}
        />
    );
    return (
        <MenuItem2
            selected={modifiers.active}
            disabled={disabled || modifiers.disabled}
            icon={modifiers.active ? 'tick' : 'blank'}
            key={valueId}
            text={text}
            onClick={handleClick}
            shouldDismissPopover={false}
            title={title}
        />
    );
};

const ControlledSuggest: FC<{
    isLoading?: boolean;
    disabled?: boolean;
    items: Item[];
    field: ControllerRenderProps<
        FieldValues,
        string | `${string}.${string}` | `${string}.${number}`
    >;
    suggestProps?: Partial<React.ComponentProps<typeof Suggest2<Item>>>;
}> = ({ isLoading, suggestProps, disabled, items, field, ...props }) => {
    const activeItem = items.find((item) => item.value === field.value);
    const onItemSelect = useCallback(
        (item: Item) => {
            field.onChange(item.value);
        },
        [field],
    );
    return (
        <Suggest2<Item>
            fill
            items={items}
            {...props}
            {...field}
            noResults={
                isLoading ? (
                    <Spinner size={16} style={{ margin: 12 }} />
                ) : (
                    <MenuItem2 disabled text="No suggestions." />
                )
            }
            itemsEqual={isItemMatch}
            selectedItem={activeItem}
            activeItem={activeItem}
            itemRenderer={renderItem}
            onItemSelect={onItemSelect}
            popoverProps={{
                minimal: true,
                matchTargetWidth: true,
                popoverClassName: 'autocomplete-max-height',
            }}
            itemPredicate={itemPredicate}
            resetOnSelect
            inputValueRenderer={(item: Item) => {
                return item.label;
            }}
            {...suggestProps}
        >
            <Button
                className={disabled ? 'disabled-filter' : ''}
                disabled={disabled}
                rightIcon="caret-down"
                text={activeItem?.label}
                fill
                style={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    whiteSpace: 'nowrap',
                }}
            />
        </Suggest2>
    );
};

interface Props extends Omit<InputWrapperProps, 'render'> {
    isLoading?: boolean;
    items: Item[];

    suggestProps?: Partial<React.ComponentProps<typeof Suggest2<Item>>>;
}

const AutoComplete: FC<Props> = ({
    isLoading,
    items,
    suggestProps,
    ...rest
}) => (
    <InputWrapper
        {...rest}
        render={(props, { field }) => (
            <ControlledSuggest
                isLoading={isLoading}
                disabled={rest.disabled}
                field={field}
                items={items}
                suggestProps={suggestProps}
                {...props}
            />
        )}
    />
);
export default AutoComplete;
