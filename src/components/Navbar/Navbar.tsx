import React, { useState, useEffect } from 'react';
import logo from '../../assets/Intersect.svg'
import searchIcon from '../../assets/search.svg';
import './Navbar.scss';
import check from '../../assets/check.svg';
import downChevron from '../../assets/chevron-down.svg';

type NavItem = {
  width: number;
  item: number;
};

const navMenu: string[] = [
  "HOME", "ELECTRONICS", "BOOKS", "MUSIC", "MOVIES", "CLOTHING",
  "GAMES", "FURNITURE", "HEALTH", "TRAVEL", "FOOTWEAR", "JEWELRY", "BEAUTY"
];

const dynamicNavItems: NavItem[] = [
  { width: 1750, item: 7 },
  { width: 1730, item: 6 },
  { width: 1640, item: 6 },
  { width: 1505, item: 5 },
  { width: 1400, item: 4 },
  { width: 1310, item: 3 },
  { width: 1210, item: 2 },
  { width: 924, item: 1 }
];

function Navbar() {
  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Initial setup
    updateCategories();

    // Add a resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    updateCategories();
  };

  const updateCategories = () => {
    const availableWidth = window.innerWidth;
    let maxVisibleItems = 0;
    //maintaining the two arrays based on the screen size
      for (const item of dynamicNavItems) {
        if (availableWidth >= item.width) {
          maxVisibleItems = item.item;
          break;
        }
      }
    const visible = navMenu.slice(0, maxVisibleItems);
    const hidden = navMenu.slice(maxVisibleItems);

    setVisibleCategories(visible);
    setHiddenCategories(hidden);
  };

  const toggleHiddenCategories = () => {
    setShowMore(!showMore);
    setActiveCategory(null);
  };

  return (
    <>
      <div className='nav-parent'>
        <div className='nav-title'>
          <img src={logo} width={23} height={23} alt="Logo" />
          <span>E-COMM</span>
        </div>
        <div className='nav-category'>
          {visibleCategories.map((navItem: string) => (
            <div key={navItem} className={`nav-item ${activeCategory === navItem ? 'active' : ''}`} onClick={() => setActiveCategory(navItem)}>
              <span>{navItem}</span>
              {activeCategory === navItem ? <img src={check} width={12} height={12} alt="Check Icon" /> : null}
            </div>
          ))}
        </div>
        <div className='flex'>
          <div className='nav-item more-button cursor-pointer' onClick={toggleHiddenCategories}>
            <span>{showMore ? "LESS" : "MORE"}</span>
            <img className='down-icon' src={downChevron} alt="More Icon" />
          </div>
          <div>
            {showMore && (
              <div className='hidden-categories'>
                {hiddenCategories.map((navItem: string) => (
                  <div key={navItem} className={`nav-item ${activeCategory === navItem ? 'active' : ''}`} onClick={() => setActiveCategory(navItem)}>
                    <span>{navItem}</span>
                    {activeCategory === navItem ? <img src={check} width={12} height={12} alt="Check Icon" /> : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='nav-search'>
          <img src={searchIcon} width={20} height={20} alt="Search Icon" />
          <input placeholder='Search something' />
        </div>
      </div>
    </>
  );
}

export default Navbar;
