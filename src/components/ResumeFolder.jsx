import UseContext from '../Context';
import { useContext, useEffect, useRef, useState} from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import Resume from '../assets/folder.png';
import '../css/ResumeFolder.css';

function ResumeFolder() {

  const iconRefs = useRef([]);

  const { 
    key, setKey,
    dragging, setDragging,
    handleOnDrag,
    handleDrop,
    ResumeFolderRef,
    dropTargetFolder, setDropTargetFolder,
    imageMapping,
    desktopIcon, 
    themeDragBar,
    ResumeExpand, setResumeExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleShowMobile,
    handleShow,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,
  } = useContext(UseContext);

  function handleDragStop(event, data) {
    const positionX = data.x;
    const positionY = data.y;
    setResumeExpand(prev => ({
      ...prev,
      x: positionX,
      y: positionY,
    }));
  }

  function handleExpandStateToggle() {
    setResumeExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand,
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setResumeExpand(prevState => ({
        ...prevState,
        expand: !prevState.expand,
      }));
    }
    setLastTapTime(now);
  }

  return (
    <Draggable
      axis="both" 
      handle={'.folder_dragbar'}
      grid={[1, 1]}
      scale={1}
      disabled={ResumeExpand.expand}
      bounds={{ top: 0 }}
      defaultPosition={{ 
        x: window.innerWidth <= 500 ? 30 : 60,
        y: window.innerWidth <= 500 ? 30 : 80,
      }}
      onStop={(event, data) => {handleDragStop(event, data)}}
      onStart={() => {handleSetFocusItemTrue('Resume')}}
    >
        <motion.div 
          ref={ResumeFolderRef}
          className='folder_folder'
          onClick={(e) => {
            e.stopPropagation();
          handleSetFocusItemTrue('Resume');
          }}
          style={ResumeExpand.expand ? inlineStyleExpand('Resume') : inlineStyle('Resume')}
        >
        <div className="folder_dragbar"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: ResumeExpand.focusItem ? themeDragBar : '#757579' }}
        >
          <div className="folder_barname">
            <img src={Resume} alt="Resume" />
            <span>Resume</span>
          </div>
          <div className="folder_barbtn">
            <div onClick={ !isTouchDevice ? (e) => {
              e.stopPropagation();
              setResumeExpand(prev => ({ ...prev, hide: true, focusItem: false }));
              StyleHide('Resume'); 
            } : undefined}
            onTouchEnd={(e) => {
              e.stopPropagation()
              setResumeExpand(prev => ({...prev, hide: true, focusItem: false}))
              StyleHide('Resume')
            }}
            >
              <p className='dash'></p>
            </div>
            <div 
              onClick={ !isTouchDevice ? handleExpandStateToggle : undefined}
              onTouchEnd={handleExpandStateToggleMobile}
            >
              <motion.div className={`expand ${ResumeExpand.expand ? 'full' : ''}`} />
              {ResumeExpand.expand ? <div className="expand_2"></div> : null}
            </div>
            <div>
              <p className='x'
                onClick={!isTouchDevice ? () => deleteTap('Resume') : undefined}
                onTouchEnd={() => deleteTap('Resume')}
              >x</p>
            </div>
          </div>
        </div>

        <div className="file_edit_container">
          <p>File<span style={{ left: '-23px' }}>_</span></p>
          <p>Edit<span style={{ left: '-24px' }}>_</span></p>
          <p>View<span style={{ left: '-32px' }}>_</span></p>
          <p>Help<span style={{ left: '-30px' }}>_</span></p>
        </div>
        <div className="folder_content"
          onClick={() => iconFocusIcon('')}
          style={ResumeExpand.expand ? { height: 'calc(100svh - 122px)' } : {}}
        >
          <div className='parent_item_container' key={key}>
            <div className="item_container" onClick={(e) => e.stopPropagation()}>
              {desktopIcon.filter(icon => icon.folderId === 'Resume').map(icon => (
                <>
                  <Draggable
                  axis="both" 
                  handle={'.icon'}
                  grid={[10, 10]}
                  scale={1}
                  disabled={ResumeExpand.expand}
                  bounds={false}
                  onStart={() => setDropTargetFolder('')}
                  onDrag={handleOnDrag(icon.name, iconRefs.current[icon.name])}
                  onStop={(e) => {
                    handleDrop(e, icon.name, dropTargetFolder);
                  }}
                >
                  <div className='icon' key={icon.name}
                    ref={(el) => iconRefs.current[icon.name] = el}
                    onDoubleClick={() => handleShow(icon.name)}                      
                    onClick={!isTouchDevice ? (e) => {
                      iconFocusIcon(icon.name);
                      e.stopPropagation();
                    } : undefined}           
                    onTouchStart={() => {
                      handleShowMobile(icon.name);
                      iconFocusIcon(icon.name);
                    }}
                  >
                    <img src={imageMapping(icon.pic)} alt='#' className={icon.focus ? 'img_focus' : ''}/>
                    <p className={icon.focus ? 'p_focus' : 'p_normal'}>{icon.name}</p>
                  </div>
                  </Draggable>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="btm_bar_container">
          <div className="object_bar">
            <p>
              {desktopIcon.filter(icon => icon.folderId === 'Resume').some(icon => icon.focus) ? 
                '1 ' :
                desktopIcon.filter(icon => icon.folderId === 'Resume').length
              }{' ' + 'object(s)'}
            </p>
          </div>
          <div className="size_bar">
            <p>
              {(() => {
                const filteredIcons = desktopIcon.filter(icon => icon.folderId === 'Resume');
                const totalSize = filteredIcons.reduce((total, icon) => total + icon.size, 0);
                const allNotFocused = filteredIcons.every(icon => !icon.focus);

                if (allNotFocused) {
                  return totalSize; 
                } else {
                  return filteredIcons
                    .filter(icon => icon.focus)
                    .map(icon => icon.size) 
                    .reduce((sum, size) => sum + size, 0); 
                }
              })()} KB
            </p>
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
}

export default ResumeFolder;
