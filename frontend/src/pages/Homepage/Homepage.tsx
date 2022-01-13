import React, { useRef, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import Fab from '@mui/material/Fab';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Cookies from 'js-cookie';
import { ColumnData } from '../../components/Columns/ColumnData';
import NavigationBar from '../../components/SideNavigation/SideNavigationBar';
import AUTH_TOKEN from '../../constants';
import FactCheckDrawer from '../../components/FactCheck/FactCheckDrawer';
import { DrawerStateProvider } from '../../components/FactCheck/FactCheckDrawerState';
import { CollectionsListStateProvider } from '../../components/Cards/CardsButtons/AddToCollection/CollectionsList/CollectionsListState';
import { NavDrawerStateProvider } from '../../components/SideNavigation/SideNavigationDrawerState';
import DefaultColumns from '../../components/Columns/DefaultColumns';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    scrollBehavior: 'smooth',
  },
  columnContainers: {
    margin: '5px',
    display: 'flex',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      height: '10px',
      width: '1em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'lightGray',
      borderRadius: 8,
    },
  },
  arrowIcon: {
    color: theme.palette.primary.main,
  },
}));

export interface DrawerState {
  suggestedKeyWords: Array<string>;
  open: boolean;
}

const Homepage = () => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  const [isFirstElement, setIsFirstElement] = useState(false);
  const [isLastElement, setIsLastElement] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const history = useHistory();

  if (!Cookies.get(AUTH_TOKEN)) {
    // history.push('/signin');
    return <Redirect to="/signin" />;
  }

  const buttonScroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollTo({
        left: (ref.current.scrollLeft += scrollOffset),
        behavior: 'smooth',
      });
    }
  };

  // FIX

  // useEffect(() => {
  //   if (ref.current) {
  //     if (ref.current.scrollWidth <= ref.current.clientWidth) {
  //       setIsLastElement(true);
  //     } else {
  //       setIsLastElement(false);
  //     }
  //   }
  //   return () => {};
  // }, [ref.current?.scrollWidth, ref.current?.clientWidth]);

  const onScroll = () => {
    if (ref.current) {
      // if (ref.current.scrollLeft === 0 && !isFirstElement) {
      //   setIsFirstElement(true);
      // } else {
      //   setIsFirstElement(false);
      // }
      // if (
      //   Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      //     ref.current.offsetWidth &&
      //   !isLastElement
      // ) {
      //   setIsLastElement(true);
      // } else {
      //   setIsLastElement(false);
      // }
    }
  };

  // const debounceOnScrollHandler = useMemo(
  //   () => debounce(onScroll, 60),
  //   [isLastElement, isFirstElement, ref.current?.scrollLeft]
  // );

  // useEffect(
  //   () => () => debounceOnScrollHandler.cancel(),
  //   [
  //     isLastElement,
  //     isFirstElement,
  //     ref.current?.scrollLeft,
  //     debounceOnScrollHandler,
  //   ]
  // );

  return (
    <div className={classes.root}>
      <DrawerStateProvider value={{ suggestedKeyWords: [], open: false }}>
        <CollectionsListStateProvider value={{ collectionId: 0 }}>
          <NavDrawerStateProvider value={{ isOpen: false, current: '' }}>
            <NavigationBar />
            <Toolbar />
            <FactCheckDrawer />
            <div style={{ overflow: 'hidden' }}>
              <div
                ref={ref}
                className={classes.columnContainers}
                onScroll={onScroll}
              >
                <DefaultColumns />
                <ColumnData />
                {!isFirstElement && (
                  <Fab
                    onClick={() => buttonScroll(-320)}
                    style={{
                      opacity: 0.9,
                      position: 'fixed',
                      left: 65,
                      top: '50%',
                    }}
                  >
                    <ArrowLeftIcon className={classes.arrowIcon} />
                  </Fab>
                )}
                {!isLastElement && (
                  <Fab
                    onClick={() => buttonScroll(320)}
                    style={{
                      opacity: 0.9,
                      position: 'fixed',
                      right: 15,
                      top: '50%',
                    }}
                  >
                    <ArrowRightIcon className={classes.arrowIcon} />
                  </Fab>
                )}
              </div>
            </div>
          </NavDrawerStateProvider>
        </CollectionsListStateProvider>
      </DrawerStateProvider>
    </div>
  );
};

export default Homepage;