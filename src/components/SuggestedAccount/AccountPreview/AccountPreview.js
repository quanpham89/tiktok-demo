import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button/Button';
import images from '~/assests/images';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function AccountPreview({ data }) {
    const handleValue = (value) => {
        let result = value;

        if (value >= 10000) {
            result = (value / 1000).toFixed(2);
            result = `${result} K`;
        } else if (value >= 100000) {
            result = (value / 10000).toFixed(2);
            result = `${result} K`;
        } else if (value >= 1000000) {
            result = (value / 100000).toFixed(2);
            result = `${result} M`;
        }
        return result;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data.avatar || images.noImage} alt="" />
                <Button primary className={cx('follow-btn')}>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}> {handleValue(data.followers_count)} </strong>
                    <span className={cx('label')}>{data.followers_count > 2 ? 'Follows' : 'Follow'}</span>
                    <strong className={cx('value')}>{handleValue(data.likes_count)} </strong>
                    <span className={cx('label')}>{data.likes_count > 2 ? 'Likes' : 'Like'}</span>
                </p>
            </div>
        </div>
    );
}
AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
