/**
 * External Dependencies
 */
import React from 'react';
import { get } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import Card from 'components/card';
import { getStreamUrl } from 'reader/route';
import ReaderAvatar from 'blocks/reader-avatar';
import ReaderSiteStreamLink from 'blocks/reader-site-stream-link';
import { siteNameFromSiteAndPost } from 'reader/utils';
import ReaderCombinedCardPost from './post';
import { keysAreEqual, keyForPost } from 'lib/feed-stream-store/post-key';
import QueryReaderSite from 'components/data/query-reader-site';
import QueryReaderFeed from 'components/data/query-reader-feed';

const ReaderCombinedCard = ( { posts, site, feed, postKey, selectedPostKey, onClick, isDiscover, translate } ) => {
	const feedId = postKey.feedId;
	const siteId = postKey.blogId;
	const siteIcon = get( site, 'icon.img' );
	const feedIcon = get( feed, 'image' );
	const streamUrl = getStreamUrl( feedId, siteId );
	const siteName = siteNameFromSiteAndPost( site, posts[ 0 ] );
	const isSelectedPost = post => keysAreEqual( keyForPost( post ), selectedPostKey );

	return (
		<Card className="reader-combined-card">
			<header className="reader-combined-card__header">
				<ReaderAvatar
					siteIcon={ siteIcon }
					feedIcon={ feedIcon }
					author={ null }
					preferGravatar={ true }
					siteUrl={ streamUrl }
					siteIconSize={ 32 } />
				<div className="reader-combined-card__header-details">
					<ReaderSiteStreamLink
						className="reader-combined-card__site-link"
						feedId={ feedId }
						siteId={ siteId }>
						{ siteName }
					</ReaderSiteStreamLink>
					<p className="reader-combined-card__header-post-count">
						{ translate( '%(count)d posts', {
							args: {
								count: posts.length
							}
						} ) }
					</p>
				</div>
			</header>
			<ul className="reader-combined-card__post-list">
				{ posts.map( post => (
					<ReaderCombinedCardPost
						key={ `post-${ post.ID }` }
						post={ post }
						streamUrl={ streamUrl }
						onClick={ onClick }
						isDiscover={ isDiscover }
						isSelected={ isSelectedPost( post ) }
						/>
				) ) }
			</ul>
			{ feedId && <QueryReaderFeed feedId={ +feedId } includeMeta={ false } /> }
			{ siteId && <QueryReaderSite siteId={ +siteId } includeMeta={ false } /> }
		</Card>
	);
};

ReaderCombinedCard.propTypes = {
	posts: React.PropTypes.array.isRequired,
	site: React.PropTypes.object,
	feed: React.PropTypes.object,
	onClick: React.PropTypes.func,
	isDiscover: React.PropTypes.bool,
	selectedPostKey: React.PropTypes.object
};

ReaderCombinedCard.defaultProps = {
	isDiscover: false,
};

export default localize( ReaderCombinedCard );
