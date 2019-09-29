/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>

#import "NewcomerScreenViewController.h"
#import "BookOverviewScreenViewController.h"
#import "ChapterEditScreenViewController.h"

@implementation AppDelegate {
  RCTBridge *bridge;
  UIViewController *rootVC;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  
  // it will be UserDefaults check instead of true later
  if (true) {
    rootVC = [[NewcomerScreenViewController alloc] initWithBridge:bridge];
  } else {
    UIViewController *vc = [[BookOverviewScreenViewController alloc] initWithBridge:bridge];
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vc];
    
    rootVC = nav;
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.rootViewController = rootVC;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)present:(NSString *)screen andProps:(NSDictionary *)props {
  if ([screen isEqualToString:@"BookOverviewScreen"]) {
    UIViewController *vc = [[BookOverviewScreenViewController alloc] initWithBridge:bridge];
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vc];
    
    [rootVC presentViewController:nav animated:YES completion:^{
      self->rootVC = nav;
    }];
  }
}

- (void)present:(NSString *)screen andProps:(NSDictionary *)props andFeedback:(RCTResponseSenderBlock)feedback {
  if ([screen isEqualToString:@"ChapterEditScreen"]) {
    if ([rootVC isKindOfClass:[UINavigationController class]]) {
      UIViewController *vc = [[ChapterEditScreenViewController alloc] initWithBridge:bridge andProps:props andFeedback:feedback];
      [(UINavigationController *)rootVC pushViewController:vc animated:YES];
    } else {
      UIViewController *vc = [[ChapterEditScreenViewController alloc] initWithBridge:bridge andProps:props andFeedback:feedback];
      vc.navigationItem.title = @"Create first chapter";
      UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vc];
      
      [rootVC presentViewController:nav animated:YES completion:^{
        self->rootVC = nav;
      }];
    }
  }
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
