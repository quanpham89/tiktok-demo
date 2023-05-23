import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';
import * as userService from '~/Services/userService';
import Button from '~/components/Button/Button';
import {
    HomeIcon,
    UserGroupIcon,
    LiveIcon,
    DiscoverIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    DiscoverActiveIcon,
} from '~/components/Icons';

import Menu, { MenuItem } from './Menu';
import SuggestedAccount from '~/components/SuggestedAccount/SuggestedAccount';
const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    const isSignIn = false;

    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers(data);
            })
            .catch((err) => console.log(err));
    }, [page]);

    const handleSeeAll = () => {
        setPage(page + 1);
    };
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem
                    title="Dicover"
                    to={config.routes.discover}
                    icon={<DiscoverIcon />}
                    activeIcon={<DiscoverActiveIcon />}
                />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} />
            </Menu>
            {isSignIn ? (
                <SuggestedAccount label="Suggested accounts" data={suggestedUsers} onSeeAll={handleSeeAll} />
            ) : (
                <div className={cx('suggest-wapper')}>
                    <p className={cx('leadership')}>Đăng nhập để follow các tác giả, thích video và xem bình luận. </p>
                    <Button className={cx('SignIn-btn')} outline>
                        Đăng nhập
                    </Button>
                </div>
            )}
            {isSignIn ? (
                <SuggestedAccount data={suggestedUsers} label="Following accounts" />
            ) : (
                <SuggestedAccount label="Suggested accounts" data={suggestedUsers} onSeeAll={handleSeeAll} />
            )}
        </aside>
    );
}

export default Sidebar;
