import UseContext from '../Context'
import { useContext, useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import file4 from '../assets/file4.png'
import folder from '../assets/regFolder.png'
import '../css/ResumeFolder.css'


function TypeFolder() {

  const { 
    TypeExpand, setTypeExpand,
    setNoteExpand,
    setNftExpand,
    setResumeExpand,
    setMybioExpand,
    setProjectExpand,
    setMailExpand,
    setWinampExpand,
    tap, setTap,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    iconState, setIconState,
    handleDoubleTapEnterMobile,

   } = useContext(UseContext);

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setTypeExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setTypeExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setTypeExpand(prevState => ({
            ...prevState,
            expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
}

    function handleSetFocusItemTrue() { //click on one, other goes false
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
        })));
        setTypeExpand(prev => ({...prev, focusItem: true}))
        setMybioExpand(prev => ({...prev, focusItem: false}))
        setProjectExpand(prev => ({...prev, focusItem: false}))
        setMailExpand(prev => ({...prev, focusItem: false}))
        setResumeExpand(prev => ({...prev, focusItem: false}))
        setNoteExpand(prev => ({...prev, focusItem: false}))
        setNftExpand(prev => ({...prev, focusItem: false}))
        setWinampExpand(prev => ({...prev, focusItem: false, focus: false}))
    }


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={TypeExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={handleSetFocusItemTrue}
      >
        <div className='folder_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue();
            }}
            style={ TypeExpand.expand ? 
            {
                display: TypeExpand.show ? 'block' : '',
                maxWidth: 'none',
                width: '100%',
                height: 'calc(100% - 37px)',
                left: `${TypeExpand.x <= 0 ? Math.abs(TypeExpand.x)*2 + TypeExpand.x : -TypeExpand.x}px`,
                top: `${TypeExpand.y <= 0 ? Math.abs(TypeExpand.y)*2 + TypeExpand.y : -TypeExpand.y}px`,
                opacity: TypeExpand.hide ? '0' : '1',
                zIndex: TypeExpand.hide ? '-1' : (TypeExpand.focusItem ? '999' : '3'),
                pointerEvents: TypeExpand.hide ? 'none' : 'auto',
                resize: TypeExpand.expand ? 'none' : '',
            } : { 
                display: TypeExpand.show ? 'block' : '',
                opacity: TypeExpand.hide ? '0' : '1',
                zIndex: TypeExpand.hide ? '-1' : (TypeExpand.focusItem ? '999' : '3'),
                pointerEvents: TypeExpand.hide ? 'none' : 'auto'
                
            }
        }>
          <div className="folder_dragbar"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: TypeExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="folder_barname">
              <img src={folder} alt="folder" />
              <span>Typing</span>
            </div>
            <div className="folder_barbtn">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setTypeExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Typing') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setTypeExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Typing')
                  }}
              >
                <p className='dash'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand ${TypeExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {TypeExpand.expand ? 
                (
                <div className="expand_2"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x'
                 onClick={!isTouchDevice ? () => {
                  setTypeExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Type')
                  setTap(newTap)
                 }: undefined
                }
                onTouchEnd={() => {
                  setTypeExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Type')
                  setTap(newTap)
              }}
              >x</p></div>
            </div>
          </div>

          <div className="file_edit_container">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="folder_content"
            onClick={() => setTypeExpand(prev => ({...prev, item_1Focus: false}))}
            style={TypeExpand.expand ? 
              { height: 'calc(100svh - 122px)'} 
              : 
              {}
            }
          >
            <div className="item_container">
              <div className='item_1'
                onDoubleClick={ !isTouchDevice ? () => window.open('https://yuteoctober.github.io/typingGame/', '_blank'): undefined}
                onTouchEnd={() => handleDoubleTapEnterMobile('Type')}
                onClick={(e) => {
                  e.stopPropagation();
                  setTypeExpand(prev => ({...prev, item_1Focus: true}));
                  setIconState(iconState.map(icon => ({...icon, focus: false})))
                  setNoteExpand(prev => ({...prev, item_1Focus: false}))
                  setNftExpand(prev => ({...prev, item_1Focus: false}))
                  setProjectExpand(prev => ({
                    ...prev, item_1Focus: false, item_2Focus: false, item_3Focus: false
                  }))
                }}
              >
                <img src={file4} alt="file4" 
                  className={TypeExpand.item_1Focus? 'item_1_img_focus' : ''}
                />
                <p className={TypeExpand.item_1Focus? 'item_1_p_focus' : ''}>
                  Typing
                </p>
              </div>
            </div>
          </div>
          <div className="btm_bar_container">
            <div className="object_bar"><p>1 object(s) {TypeExpand.item_1Focus?'selected':''}</p></div>
            <div className="size_bar"><p>7.28 MB</p></div>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default TypeFolder