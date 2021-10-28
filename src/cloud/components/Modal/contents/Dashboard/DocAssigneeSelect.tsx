import React, { useMemo, useCallback } from 'react'
import { usePage } from '../../../../lib/stores/pageStore'
import { SerializedUser } from '../../../../interfaces/db/user'
import FormSelect, {
  FormSelectOption,
} from '../../../../../design/components/molecules/Form/atoms/FormSelect'
import styled from '../../../../../design/lib/styled'
import UserIcon from '../../../UserIcon'

interface DocAssigneeSelectProps {
  value: string
  update: (value: string) => void
}

const DocAssigneeSelect = ({ value, update }: DocAssigneeSelectProps) => {
  const { permissions } = usePage()

  const options = useMemo(() => {
    if (permissions == null) {
      return []
    }
    return permissions.map((permission) => {
      return getOptionByUser(permission.user)
    })
  }, [permissions])

  const selectedOptions = useMemo(() => {
    if (permissions == null) {
      return []
    }
    const userMap = permissions.reduce((map, permission) => {
      const { user } = permission
      map.set(user.id, user)
      return map
    }, new Map())

    return getSelectedOptionsByUserId(value, userMap)
  }, [permissions, value])

  const updateAssignees = useCallback(
    (option: FormSelectOption) => {
      update(option.value)
    },
    [update]
  )

  return (
    <FormSelect
      isMulti={false}
      options={options}
      value={selectedOptions}
      onChange={updateAssignees}
    />
  )
}

export default DocAssigneeSelect

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`

function getOptionByUser(user: SerializedUser): FormSelectOption {
  return {
    label: (
      <ItemContainer>
        <UserIcon
          user={user}
          style={{
            width: '20px',
            height: '20px',
            fontSize: '12px',
            lineHeight: '18px',
            marginRight: '4px',
          }}
        />

        {user.displayName}
      </ItemContainer>
    ),
    value: user.id,
  }
}

function getSelectedOptionsByUserId(
  value: string,
  userMap: Map<string, SerializedUser>
): FormSelectOption | undefined {
  const user = userMap.get(value)
  if (user == null) {
    console.warn(`User Id ${value} does not exist in page props`)
    return undefined
  }
  return getOptionByUser(user)
}
