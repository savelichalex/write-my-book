//
//  BookOverviewScreenViewController.m
//  WriteMyBook
//
//  Created by Алексей Савельев on 29/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "BookOverviewScreenViewController.h"
#import <React/RCTSurfaceHostingView.h>
#import <React/RCTSurfaceSizeMeasureMode.h>
#import <React/RCTSurface.h>

@interface BookOverviewScreenViewController ()

@end

@implementation BookOverviewScreenViewController {
  RCTBridge *_bridge;
  UIView *container;
  BOOL isCreatedSurface;
}

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
  self = [super init];
  if (self) {
    _bridge = bridge;
    isCreatedSurface = NO;
  }
  return self;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view.
  self.navigationController.navigationBarHidden = YES;
  
  self.view.backgroundColor = [UIColor colorWithRed:0.96 green:0.97 blue:0.98 alpha:1.0];
  
  container = [[UIView alloc] init];
  container.translatesAutoresizingMaskIntoConstraints = NO;
  
  [self.view addSubview:container];
  
  if (@available(iOS 11.0, *)) {
    [container.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor].active = YES;
    [container.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor].active = YES;
    [container.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor].active = YES;
    [container.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor].active = YES;
  } else {
    [container.topAnchor constraintEqualToAnchor:self.topLayoutGuide.bottomAnchor].active = YES;
    [container.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor].active = YES;
    [container.leadingAnchor constraintEqualToAnchor:self.view.layoutMarginsGuide.leadingAnchor].active = YES;
    [container.trailingAnchor constraintEqualToAnchor:self.view.layoutMarginsGuide.trailingAnchor].active = YES;
  }
}

- (void)viewDidLayoutSubviews {
  if (!isCreatedSurface) {
    RCTSurfaceHostingView *view = [[RCTSurfaceHostingView alloc] initWithBridge:_bridge moduleName:@"BookOverviewScreen" initialProperties:@{} sizeMeasureMode:RCTSurfaceSizeMeasureModeWidthExact | RCTSurfaceSizeMeasureModeHeightExact];
    
    CGSize minimumSize = (CGSize){0, 0};
    CGSize maximumSize = (CGSize){container.frame.size.width, container.frame.size.height};
    [view.surface setMinimumSize:minimumSize maximumSize:maximumSize];
    
    view.translatesAutoresizingMaskIntoConstraints = NO;
    
    [container addSubview:view];
    isCreatedSurface = YES;
  }
}

@end
