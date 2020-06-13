import React, { useEffect } from 'react'
import Dialog, { Dioalogprops } from './dialog'
import usePortal, { UsePortalOptions } from '../usePortal'



export default (props: Dioalogprops) => {
  const { getContainer, visible } = props;
  const { Portal, isOpen, setOpen  } = usePortal({
    bindTo: getContainer,
    isOpen: visible,
  } as UsePortalOptions )
  if (getContainer === false) {
    return (
      <Dialog
        {...props}
      />
    )
  }
  useEffect(() => {
   
    setOpen(visible)
  }, [setOpen, visible])
  

  return (
    isOpen ? <Portal>
      <Dialog
        {...props}
      />
    </Portal>
    : null
  )
}
