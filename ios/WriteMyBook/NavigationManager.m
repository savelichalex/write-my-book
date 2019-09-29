//
//  NavigationManager.m
//  WriteMyBook
//
//  Created by Алексей Савельев on 29/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "NavigationManager.h"
#import "AppDelegate.h"

@implementation NavigationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(present:(NSString *)screen andProps:(NSDictionary *)props) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [(AppDelegate *)[[UIApplication sharedApplication] delegate] present:screen andProps:props];
  });
}

RCT_EXPORT_METHOD(presentWithFeedback:(NSString *)screen andProps:(NSDictionary *)props andFeedback:(RCTResponseSenderBlock)feedback) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [(AppDelegate *)[[UIApplication sharedApplication] delegate] present:screen andProps:props andFeedback:feedback];
  });
}

@end
