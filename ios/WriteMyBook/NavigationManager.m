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

RCT_EXPORT_METHOD(present:(NSString *)screen) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [(AppDelegate *)[[UIApplication sharedApplication] delegate] present:screen];
  });
}

@end
