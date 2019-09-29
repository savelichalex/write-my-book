//
//  ChapterEditScreenViewController.h
//  WriteMyBook
//
//  Created by Алексей Савельев on 29/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>

NS_ASSUME_NONNULL_BEGIN

@interface ChapterEditScreenViewController : UIViewController

- (instancetype)initWithBridge:(RCTBridge *)bridge andProps:(NSDictionary *)props andFeedback:(RCTResponseSenderBlock)feedback;

@end

NS_ASSUME_NONNULL_END
