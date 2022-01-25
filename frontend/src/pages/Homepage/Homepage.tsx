import React, { useRef, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import Fab from '@mui/material/Fab';
import LeftScroll from '@mui/icons-material/ArrowBackIos';
import RightScroll from '@mui/icons-material/ArrowForwardIos';
import Cookies from 'js-cookie';
import { ColumnData } from '../../components/Columns/ColumnData';
import NavigationBar from '../../components/SideNavigation/SideNavigationBar';
import AUTH_TOKEN from '../../constants';
import FactCheckDrawer from '../../components/FactCheck/FactCheckDrawer';
import { DrawerStateProvider } from '../../components/FactCheck/FactCheckDrawerState';
import { CollectionsListStateProvider } from '../../components/Cards/CardsButtons/AddToCollection/CollectionsList/CollectionsListState';
import { NavDrawerStateProvider } from '../../components/SideNavigation/SideNavigationDrawerState';
import { SuccessAlertProvider } from '../../components/SideNavigation/OnCreateSuccessSnackbarState';
import DefaultColumns from '../../components/Columns/DefaultColumns';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    scrollBehavior: 'smooth',
  },
  columnContainers: {
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
    color: 'gray',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  scrollButton: {
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
    },
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
          <SuccessAlertProvider
            value={{ type: '', feedTitle: '', success: false }}
          >
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
                      size="small"
                      onClick={() => buttonScroll(-320)}
                      style={{
                        position: 'fixed',
                        left: 55,
                        top: '50%',
                        paddingLeft: '10px',
                      }}
                      className={classes.scrollButton}
                    >
                      <LeftScroll className={classes.arrowIcon} />
                    </Fab>
                  )}
                  {!isLastElement && (
                    <Fab
                      size="small"
                      onClick={() => buttonScroll(320)}
                      style={{ position: 'fixed', right: 15, top: '50%' }}
                      className={classes.scrollButton}
                    >
                      <RightScroll className={classes.arrowIcon} />
                    </Fab>
                  )}
                </div>
              </div>
            </NavDrawerStateProvider>
          </SuccessAlertProvider>
        </CollectionsListStateProvider>
      </DrawerStateProvider>
    </div>
  );
};

export default Homepage;
